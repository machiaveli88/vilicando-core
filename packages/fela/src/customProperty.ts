import customProperty from 'fela-plugin-custom-property';

export interface ICustomProperty {
  size?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  marginX?: number | string;
  marginY?: number | string;
  borderX?: string;
  borderY?: string;
  ellipsis?: boolean | number | string;
  clearfix?: boolean;
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  flexWidth?: number | string;
}

export default () =>
  customProperty({
    size: (size: number | string) => ({
      width: size,
      height: size
    }),
    paddingX: (padding: number | string) => ({
      paddingLeft: padding,
      paddingRight: padding
    }),
    paddingY: (padding: number | string) => ({
      paddingTop: padding,
      paddingBottom: padding
    }),
    marginX: (margin: number | string) => ({
      marginLeft: margin,
      marginRight: margin
    }),
    marginY: (margin: number | string) => ({
      marginTop: margin,
      marginBottom: margin
    }),
    borderX: (border: string) => ({
      borderLeft: border,
      borderRight: border
    }),
    borderY: (border: string) => ({
      borderTop: border,
      borderBottom: border
    }),
    ellipsis: (ellipsis: boolean) =>
      !!ellipsis
        ? {
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: ellipsis === true ? '100%' : ellipsis
          }
        : {},
    clearfix: (clearfix: boolean) =>
      clearfix === true
        ? {
            ':after': {
              content: '""',
              clear: 'both',
              display: 'block',
              visibility: 'hidden',
              height: 0
            }
          }
        : {},
    center: (center: boolean) =>
      center === true
        ? {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        : {},
    centerX: (center: boolean) =>
      center === true
        ? {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }
        : {},
    centerY: (center: boolean) =>
      center === true
        ? {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
          }
        : {},
    flexWidth: (width: number | string) => ({
      maxWidth: width,
      minWidth: width,
      width
    })
  });
