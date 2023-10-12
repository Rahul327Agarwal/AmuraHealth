import { cleanup, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import MUIToaster, { TOASTER_OBJECT } from './MUIToaster';

import renderTestDom from './../../../test/renderTestDom';
import { hexToRgb } from './../../../test/test.functions';
import { Variant } from './MUIToaster.types';

const BG = '#252427';
describe('MUIToaster Component', () => {
  for (let toasterType in TOASTER_OBJECT) {
    it('should appear on dom', () => {
      renderTestDom(<MUIToaster message={TOASTER_OBJECT[toasterType].message} variant={toasterType as Variant} />);
      const toasterContainer = screen.getByTestId('toaster');
      expect(toasterContainer).toBeInTheDocument();
      afterEach(cleanup);
    });
  }

  it(`should have background as design: ${BG}`, () => {
    renderTestDom(<MUIToaster message={TOASTER_OBJECT['success'].message} variant={'success'} />);
    const toasterContainer = screen.getByTestId('toaster');
    const computedStyle = window.getComputedStyle(toasterContainer);
    const backgroundColor = computedStyle.backgroundColor;
    expect(backgroundColor).toBe(hexToRgb(BG));
  });
});
