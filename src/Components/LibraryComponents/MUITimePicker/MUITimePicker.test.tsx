import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import renderTestDom from './../../../test/renderTestDom';
import MUITimePicker from './MUITimePicker';
import { format } from 'date-fns';

const Text_Initial = 'ah';
const initial_with_may_characters = 'many characters long';
const time = '2022-10-03T11:30:30+05:30';
const timeValue = format(new Date(time), 'hh:mm:ss a');
const HEADER_TEXT = 'Set Time';

describe('MUITimePicker Component', () => {
  it('should render the timepicker component with correct text', () => {
    renderTestDom(<MUITimePicker label="TimePicker" value={timeValue} onChange={() => {}} />);

    const timePicker = screen.getByRole('textbox', { name: /timepicker/i });
    expect(timePicker).toBeInTheDocument();
    expect(timePicker).toHaveAttribute('value', timeValue);
  });

  it('should open MUIDrawer when it is clicked', () => {
    renderTestDom(<MUITimePicker label="TimePicker" value={timeValue} onChange={() => {}} />);
    const timePicker = screen.getByRole('textbox', { name: /timepicker/i });
    fireEvent.click(timePicker);

    const hourInput = screen.getByRole('textbox', { name: /hh/i });
    const minuteInput = screen.getByRole('textbox', { name: /mm/i });

    expect(hourInput).toBeInTheDocument();
    expect(minuteInput).toBeInTheDocument();
  });

  it('should open MUIDrawer with "cancel" and "done" button', () => {
    renderTestDom(<MUITimePicker label="TimePicker" value={timeValue} onChange={() => {}} />);
    const timePicker = screen.getByRole('textbox', { name: /timepicker/i });
    fireEvent.click(timePicker);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const doneButton = screen.getByRole('button', { name: /done/i });

    expect(cancelButton).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
  });

  it('should be able to click "cancel" button', () => {
    renderTestDom(<MUITimePicker label="TimePicker" value={timeValue} onChange={() => {}} />);
    const timePicker = screen.getByRole('textbox', { name: /timepicker/i });
    fireEvent.click(timePicker);

    const hourInput = screen.getByRole('textbox', { name: /hh/i });
    const minuteInput = screen.getByRole('textbox', { name: /mm/i });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    fireEvent.click(cancelButton);
    expect(hourInput).not.toBeInTheDocument();
    expect(minuteInput).not.toBeInTheDocument();
  });

  it('should be able to click "done" button', () => {
    const onChangeMock = vi.fn();

    renderTestDom(<MUITimePicker label="TimePicker" value={timeValue} onChange={onChangeMock} />);
    const timePicker = screen.getByRole('textbox', { name: /timepicker/i });
    fireEvent.click(timePicker);

    const hourInput = screen.getByRole('textbox', { name: /hh/i });
    const minuteInput = screen.getByRole('textbox', { name: /mm/i });
    const doneButton = screen.getByRole('button', { name: /done/i });

    fireEvent.click(doneButton);
    expect(hourInput).not.toBeInTheDocument();
    expect(minuteInput).not.toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('Should have a header if header title is passed', () => {
    renderTestDom(<MUITimePicker label="TimePicker" value={timeValue} headerTitle={HEADER_TEXT} onChange={() => {}} />);
    const timePicker = screen.getByRole('textbox', { name: /timepicker/i });
    fireEvent.click(timePicker);

    expect(screen.getByText(HEADER_TEXT)).toBeInTheDocument();
  });

  it('should show correct time on the MUIDrawer editor', () => {
    renderTestDom(
      <MUITimePicker label="TimePicker" value={timeValue} headerTitle={HEADER_TEXT} showSeconds={true} onChange={() => {}} />
    );
    const timePicker = screen.getByRole('textbox', { name: /timepicker/i });
    fireEvent.click(timePicker);

    const timeCheck = new Date(time);
    const hour24 = timeCheck.getHours();
    const hour = hour24 % 12;
    const hour12 = hour ? hour.toString() : (12).toString();
    const minute = timeCheck.getMinutes().toString();
    const second = timeCheck.getSeconds().toString();
    const ampm = hour24 >= 12 ? 'PM' : 'AM';

    const hourInput = screen.getByRole('textbox', { name: /hh/i });
    const minuteInput = screen.getByRole('textbox', { name: /mm/i });
    const secondInput = screen.getByRole('textbox', { name: /ss/i });
    const ampmInput = screen.getByRole('button', { name: ampm });

    expect(hourInput).toHaveAttribute('value', hour12);
    expect(minuteInput).toHaveAttribute('value', minute);
    expect(secondInput).toHaveAttribute('value', second);
    expect(ampmInput).toHaveTextContent(ampm);
  });
});
