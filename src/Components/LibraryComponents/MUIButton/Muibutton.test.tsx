import React from 'react';
import { describe, it, test, expect, vi } from 'vitest';
import MUIButton from './MUIButton';
import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // for toBeInTheDocument()

// import { getComputedStyle } from 'global'; //'@testing-library/dom';//'global';

import renderTestDom from './../../../test/renderTestDom';

describe('MUIButton Component', () => {
  it('should be visible', () => {
    renderTestDom(<MUIButton children="abcde" hidden={false} />);
    const button = screen.getByText('abcde');
    expect(button).toBeVisible();
  });

  it('should be clickble', () => {
    renderTestDom(<MUIButton children="abcde" disabled={false} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const buttonStyle = getComputedStyle(button);
    expect(button).not.toBeDisabled();
    expect(buttonStyle.cursor).not.toBe('not-allowed');
  });

  it('should call the onClick callback when clicked', () => {
    const onClickMock = vi.fn();
    renderTestDom(<MUIButton onClick={onClickMock} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  // Test that the button works with different input devices, such as a keyboard or a mouse.

  it('should work with different input devices', () => {
    renderTestDom(<MUIButton children="abcde" disabled={false} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });

  //TEst that the button behaves as expected in different contexts,such as in a form or in a modal.

  // it('should behaves as expected in a form', () => {
  //   render(
  //     <ThemeProvider theme={theme}>
  //       <MUIButton data-testid="buttontest" type="submit" />
  //     </ThemeProvider>
  //   );
  //   const buttonform = screen.getByTestId('buttontest');
  //   render(<form data-testid="formData" onSubmit={() => {}} />);
  //   const form = screen.getByTestId('formData');
  //   form.appendChild(buttonform);
  //   fireEvent.submit(form);
  //   expect(form).toBeSubmitted();
  // });

  it('should change background color on hover', () => {
    renderTestDom(<MUIButton children={'Hover Me'} fullWidth variant={'outlined'} />);

    const button = screen.getByRole('button');

    // Initially, the background color should be red
    // expect(button).toHaveStyle({ backgroundColor: theme.palette.colors.theme.primaryLight });

    // Simulate mouseEnter to trigger hover
    fireEvent.mouseEnter(button);
    const buttonStyle = getComputedStyle(button);

    // After hovering, the background color should be blue
    // expect(button).toHaveStyle({ backgroundColor: theme.palette.colors.theme.primaryLight });
    expect(buttonStyle.backgroundColor).toBe('rgba(25, 118, 210, 0.04)');
    // Simulate mouseLeave to trigger unhover
    // fireEvent.mouseLeave(button);

    // After unhovering, the background color should be red again
    // expect(button).toHaveStyle({ backgroundColor: theme.palette.colors.theme.primaryLight });

    expect(buttonStyle.fontSize).toBe('15px');
    expect(buttonStyle.width).toBe('100%');
  });

  // Test Accessibility Attributes:
  it('should have appropriate accessibility attributes', () => {
    renderTestDom(<MUIButton children="abcde" aria-label="Custom Button" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom Button');
  });

  //Test Custom Styling:
  it('should apply custom styles', () => {
    const customStyle = {
      backgroundColor: 'blue',
      color: 'white',
    };
    renderTestDom(<MUIButton children="abcde" style={customStyle} />);
    const button = screen.getByRole('button');
    const buttonStyle = getComputedStyle(button);
    expect(buttonStyle.backgroundColor).toBe('rgb(0, 0, 255)');
    expect(buttonStyle.color).toBe('rgb(255, 255, 255)'); // RGB value for white
  });

  // Test Button Variants (e.g., primary, secondary):
  it('should render a primary button with the appropriate styles', () => {
    renderTestDom(<MUIButton children="MuiButton-outlined" variant="outlined" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined'); // Assuming a CSS class for the primary variant
  });

  it('should render a primary button with the appropriate styles', () => {
    renderTestDom(<MUIButton children="MuiButton-contained" variant="contained" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-contained'); // Assuming a CSS class for the primary variant
  });

  // Test Button Sizes (e.g., small, large):
  it('should render a small button with the appropriate styles', () => {
    renderTestDom(<MUIButton children="MuiButton-sizeSmall" size="small" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeSmall'); // Assuming a CSS class for the small size
  });

  it('should render a large button with the appropriate styles', () => {
    renderTestDom(<MUIButton children="MuiButton-sizeLarge" size="large" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeLarge'); // Assuming a CSS class for the large size
  });
});
