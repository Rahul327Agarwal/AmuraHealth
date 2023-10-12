import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { CloseIconDark } from '../../SVGs/Common';
import { ContainerHeaderStyled, ContainerStyled, DrawerBGStyled, DrawerStyled } from './MUIDrawer.styles';
import { IProps } from './MUIDrawer.types';

export default function MUIDrawer(props: IProps) {
  const { disableAutoClose, children, open, headerTitle, handleClose, drawerPadding, disableCross, ...restProps } = props;

  const commonClasses = useCommonStyles();
  const [isOpen, setIsOpen] = useState(open);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current && !ref.current?.contains(event.target as Node) && !disableAutoClose) {
      setIsOpen(false);
      handleClose();
    }
  };

  return isOpen ? (
    <DrawerBGStyled onClick={handleClickOutside}>
      <DrawerStyled ref={ref} {...restProps} onClick={(e) => e.stopPropagation()}>
        <ContainerStyled drawerPadding={drawerPadding}>
          <ContainerHeaderStyled>
            <div className={`${commonClasses.body17Medium} contentStyle`} data-testid={`drawer-header`}>
              {headerTitle || ''}
            </div>
            <div className="iconStyle" onClick={handleClose}>
              {disableCross ? '' : <CloseIconDark />}
            </div>
          </ContainerHeaderStyled>
          {children}
        </ContainerStyled>
      </DrawerStyled>
    </DrawerBGStyled>
  ) : null;
}
