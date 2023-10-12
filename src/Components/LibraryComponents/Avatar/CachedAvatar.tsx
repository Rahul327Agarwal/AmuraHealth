import { Avatar as MUIAvatar } from '@mui/material';
import React, { useEffect } from 'react';

/** Globally Storing Set for Images */
const notFoundImagesSet = new Set<string>();
const foundImagesSet = new Set<string>();

/**
 * Wraps Avatar component with caching logic.
 */
export const CachedAvatar = (props: {
  src?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [image, setImage] = React.useState<string | undefined>(foundImagesSet.has(props.src!) ? props.src : undefined);

  useEffect(() => {
    if (!props.src) {
      setImage(undefined);
      return;
    }

    //
    const getImage = async () => {
      if (notFoundImagesSet.has(props.src!)) {
        setImage(undefined);
        return;
      }
      if (foundImagesSet.has(props.src!)) {
        setImage(props.src);
        return;
      }

      // Fetching via Image object to avoid CORS issue.
      const img = new Image();
      img.src = props.src;

      img.onload = () => {
        setImage(props.src);
        foundImagesSet.add(props.src!);
      };
      img.onerror = () => {
        notFoundImagesSet.add(props.src!);
      };
    };

    //
    getImage();
  }, [props.src]);

  return (
    <MUIAvatar src={image ?? undefined} key={props.src} className={props.className} style={props.style}>
      {props.children}
    </MUIAvatar>
  );
};
