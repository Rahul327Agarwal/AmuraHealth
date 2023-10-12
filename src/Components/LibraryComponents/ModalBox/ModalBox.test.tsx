import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import ModalBox from './ModalBox';
import { render, fireEvent, screen, getByText, waitFor } from '@testing-library/react';
import renderTestDom from '../../../test/renderTestDom';
import { IModalBoxProps } from './ModalBox.types';
describe('Modal box component', () => {
  it('should render the modal box when open is true', () => {
    const props: IModalBoxProps = {
      open: true,
      modalTitle: 'modal title',
      children: 'this is the modal body',
      handleClose: () => {},
      buttonConfig: [{ text: 'ok', variant: 'contained', onClick: () => {} }],
    };
    renderTestDom(<ModalBox {...props} />);
    expect(screen.getByText('ok')).toBeInTheDocument();
  });

  it('should behave as expected in a form', async () => {
    const props: IModalBoxProps = {
      open: true,
      modalTitle: 'My Modal Title',
      handleClose: () => {},
      buttonConfig: [{ text: 'ok', variant: 'contained', onClick: () => {} }],
      children: (
        <form
          data-testid="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input data-testid="input" type="text" name="input" />
          <button data-testid="submit-button" type="submit">
            Submit
          </button>
        </form>
      ),
      showOnlyChildern: false,
    };
    const handleClosefn = vi.fn();
    renderTestDom(<ModalBox {...props} handleClose={handleClosefn} />);
    const form = screen.getByTestId('form');
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test value' } });
    fireEvent.submit(form);
    await waitFor(() => {
      expect(form).toHaveFormValues({
        input: 'test value',
      });
    });
  });

  // it('modalbox should close when user presses Escape key', async () => {
  //   const handleCloseSpy = vi.fn();
  //   renderTestDom(
  //     <ModalBox
  //       open={true}
  //       modalTitle={'modal title'}
  //       children={'this is the modal body'}
  //       handleClose={handleCloseSpy}
  //       buttonConfig={[]}
  //       data-testid="modalBox"
  //     />
  //   );
  //   const modalBox = await screen.getByTestId('modalBox');

  //   // Add an onKeyDown event listener to the modalBox element
  //   modalBox.addEventListener('keydown', (event) => {
  //     // Close the modalbox when the user presses the Escape key
  //     if (event.key === 'Escape') {
  //       handleCloseSpy();
  //     }
  //   });

  //   // Dispatch the Escape key press event
  //   modalBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

  //   // Wait for the modal box to be closed before asserting that it is null
  //   await waitFor(() => {
  //     modalBox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  //     const modalBoxElement = queryById('modalBox');
  //     expect(modalBoxElement).toBeNull();
  //   });
  // });
});
