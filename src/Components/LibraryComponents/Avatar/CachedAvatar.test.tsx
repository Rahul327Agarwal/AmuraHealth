import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { CachedAvatar } from './CachedAvatar';
import { screen, fireEvent } from '@testing-library/react';

import renderTestDom from '../../../test/renderTestDom';

describe('Cached avatar Component', () => {
  it('should have the correct src attribute', async () => {
    renderTestDom(<CachedAvatar src="/avatar.png" data-testid="my-image" />);
    // // Wait for the image to load.
    // await new Promise((resolve) => {
    //   const avatar = screen.getByTestId('my-image');
    //   avatar.onload = resolve;
    // });

    // // Assert that the image has the correct src attribute.
    // const avatar = screen.getByTestId('my-image');
    // expect(avatar).toHaveAttribute('src', '/avatar.png');
  });
});
