import { css } from 'styled-components';

export interface IStyledProps {
  theme?: ITheme;
}

export interface ITheme {
  palette: IPalette;
  container: IBaseContainer;
}

export interface IPalette {
  Basic1000: string;
  Basic900: string;
  Basic800: string;
  Basic700: string;
  Basic500: string;
  Basic400: string;
  Basic300: string;
  Basic200: string;
  Basic100: string;
  Purple800: string;
  Purple600: string;
  Purple500: string;

  Blue: string;
  Link: string;
  TextColor: string;
  BorderColor: string;
  SurfaceColor: string;
  Red: string;
  Red500: string;
  Gray: string;
  Gray100: string;
  Gray200: string;

  Orange500: string;

  Green500: string;

  StandardBlack: string;
  StandardWhite: string;
  StandardGray: string;
  Shadow: string;
  Background: string;

  Green: string;
  Black: string;
  BlackTxt: string;
}

export interface IBaseContainer {
  minWidth?: string;
  maxWidth?: string;
}

const palette: IPalette = {
  Basic1000: '#323846',
  Basic900: '#4E4E64',
  Basic800: '#30303d',
  Basic700: '#737392',
  Basic500: '#9698A7',
  Basic400: '#AFB1C0',
  Basic300: '#D2D6E1',
  Basic200: '#E7ECF7',
  Basic100: '#F5F7FC',
  Purple800: '#37317D',
  Purple600: '#3F398F',
  Purple500: '#4740A1',

  Gray: '#C4C4C4',
  Gray100: '#777777',
  Gray200: '#575757',

  Blue: '#1F5AE2',
  Link: '#1F5AE2',
  TextColor: '#E7ECF7',
  BorderColor: '#E7ECF7',
  SurfaceColor: '#1b1b1c',

  Red: '#F15A22',
  Red500: '#EB4D4B',

  Orange500: '#EE9F18',

  Green500: '#3DBE98',

  StandardBlack: '#000000',
  StandardWhite: '#E7ECF7',
  StandardGray: '#1B1B1C',

  Shadow: 'rgba(115, 115, 146, 0.16)',
  Background: 'linear-gradient(171.96deg, #4460DC 0%, #3247A2 89.05%)',

  Green: '#19B97C',
  Black: '#405965',
  // BlackTxt: '#495057',
  BlackTxt: '#212D5E',
};

export const baseTheme: any = {
  layout: {
    bgImage:
      'url("/harmony_bglogo_black.svg") no-repeat bottom right, linear-gradient(0deg, #0D0D0D, #0D0D0D), linear-gradient(0deg, rgba(33, 53, 75, 0.15), rgba(33, 53, 75, 0.15)), #111111',
  },

  sidebarMenu: {
    icon: {
      color: 'white',
    },
    color: 'white',
    backgroundColorActive: 'rgba(221,221,221,0.4)',
  },

  largeTab: {
    background: '#1b1b1c',
    disabledBackground: '#767676',
    boxShadow: '',
  },

  // storybook theming
  colorPrimary: 'black',
  colorSecondary: 'lightblue',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: 'Nunito',
  fontCode: 'monospace',
  surface: {
    color: '#1b1b1c',
    boxShadow: '',
    border: '',
  },

  dashboardCard: {
    background: '#1b1b1c',
    bodyBackground: '#333333',
  },

  modal: {
    background: '#1b1b1c',
  },

  pager: {
    border: '4px solid',
    color: palette.StandardWhite,
    colorActive: palette.StandardBlack,
    backgroundColorActive: palette.Gray,
    borderColor: '#E7ECF7',
  },

  card: {
    container: {
      elevation: 'none',
    },
  },

  // Text colors
  textColor: palette.TextColor,
  titleColor: palette.TextColor,
  textInverseColor: palette.Basic700,

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'black',
  barBg: '#9a9a9a',
  borderColor: palette.BorderColor,

  // Form colors
  inputBg: 'white',
  inputBorder: '#D6D6D6',
  inputTextColor: 'black',
  inputBorderRadius: 4,
  tableLoaderBackground: '#000000',

  divider: {
    color: '#c2c2c2',
  },

  brandTitle: 'Bridge base theme',
  brandUrl: 'https://example.com',
  brandImage: 'https://placehold.it/350x150',

  // grommet styling
  button: {
    color: 'dark',
    border: {
      radius: '22px',
    },
    padding: {
      horizontal: '24px',
      vertical: '18px',
    },
    disabled: {
      opacity: 1.0,
    },
    // extend: css`
    //   ${(props: any) => 'letter-spacing: 4px; text-align: center;'};
    // `,
  },

  spinner: {
    size: {
      xsmall: '4px',
    },
  },

  table: {
    header: {
      pad: { vertical: 'xxsmall' },
      border: undefined,
    },
    body: {
      pad: { vertical: 'medium' },
      verticalAlign: 'top',
    },
    extend: css`
      ${() =>
        'border-collapse: separate; width: 100%; table-layout: fixed; word-break: break-all;}'}
    `,
  },

  global: {
    size: {
      // medium: '250px',
    },
    control: {
      brand: palette.Basic700,
      disabled: {
        opacity: 0.5,
      },
      border: {
        radius: '2px',
      },
    },
    border: {
      radius: '2px',
    },
    font: {
      family: 'Helvetica, sans-serif',
      size: '14px',
      height: '20px',
    },
    drop: {
      shadowSize: 0,
    },
    input: {
      border: {
        radius: '2px',
      },
      disabled: {
        opacity: 0.5,
      },
      weight: 400,
    },
    selected: {
      background: 'Yellow400',
      color: 'Basic1000',
    },
    focus: {
      border: {
        color: 'transparent',
      },
    },
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '6px',
      xsmall: '12px',
      small: '16px',
      xmedium: '20px',
      medium: '24px',
      large: '32px',
      xlarge: '40px',
      responsiveBreakpoint: 'small',
    },
    colors: {
      White1000: '#ffffff',
      Basic1000: '#000000',
      Basic800: '#30303d',
      Basic600: '#939393',
      Basic400: '#D7D7D7',
      Basic300: '#E6E6E6',
      Basic200: '#F5F5F5',
      Basic100: '#FFFFFF',
      Yellow600: '#FFCB02',
      Yellow400: '#FFE06E',
      Yellow200: '#FFF5CC',
      Green500: 'rgba(0,201,167,0.1)',
      Green600: '#00A825',
      Red500: 'rgba(201,0,0,0.1)',
      Red600: '#FF0000',
      Grey700: '#b5b5b5',
      Grey600: '#afb1c0',
      Grey500: '#9698a7',
      Grey400: '#d2d6e1',
      Blue500: '#4740a1',

      border: {
        dark: '',
        light: '#323232',
      },
      brand: 'white',
      focus: 0,
      active: '#FFCB02',
      icon: 'black',
      formBackground: '#f8f8f8',
      text: '#ffffff',
      background: '#111111',
      control: {
        dark: '#f5f5f5',
        light: '#f5f5f5',
      },
      'toggle-knob': 'black',

      buttonBgColor: '#1F5AE2',
    },
  },

  textInput: {
    extend: css`
      ${() => 'font-size: 16px; padding: 8px;'}
    `,
  },

  heading: {
    font: {
      family: 'system-ui, sans-serif',
    },
    weight: 300,

    level: {
      1: {
        font: {
          weight: 300,
        },
        medium: {
          size: '45px',
          height: '54px',
        },
        small: {
          size: '13px',
          height: '18px',
          weight: 'normal',
        },
      },
    },
    extend: css`
      ${(props: any) => props.size === 'small' && 'letter-spacing: 4px;'};
    `,
  },

  checkBox: {
    color: {
      light: 'toggle-knob',
    },
    toggle: {
      color: {
        dark: 'toggle-knob',
        light: 'toggle-knob',
      },
    },
  },

  selectPresetDefault: {
    option: {
      backgroundColorFocused: palette.Gray100,
      backgroundColorSelected: palette.Gray200,
    },
    control: {
      backgroundColor: palette.StandardGray,
    },
    menu: {
      borderColor: palette.StandardWhite,
      backgroundColor: palette.StandardBlack,
    },
  },

  selectPresetFilter: {
    option: {
      backgroundColorFocused: palette.Gray100,
      backgroundColorSelected: palette.Gray200,
    },
    control: {
      borderColor: palette.StandardWhite,
      backgroundColor: palette.StandardGray,
    },
    menu: {
      borderColor: palette.StandardWhite,
      backgroundColor: palette.StandardBlack,
    },
  },

  select: {
    border: {
      radius: '2px',
    },
    color: 'black',
    background: palette.StandardBlack,
    borderRadius: '15px',
    icons: {
      color: palette.Basic700,
    },
    options: {
      text: {
        margin: '0 5px',
        letterSpacing: '0',
      },
    },
    control: {
      extend: () => `
        border: none;
        outline: none;
        box-shadow: none;
        background-color: red;
        &:active {
          border: none;
          outline: none;
          box-shadow: none;
        }
      `,
    },
    container: {
      extend: (props: any) => `
        font-family: ${props.theme.fontBase};
        outline: none;
        box-shadow: none;
        
        * {
          font-size: 16px;
        }
      `,
    },
  },

  text: {
    color: '#FFFFFF',
    font: {
      family: 'system-ui, sans-serif',
    },
    small: {
      size: '14px',
      height: '18px',
    },
    medium: {
      size: '16px',
      height: '19px',
    },
    large: {
      size: '30px',
      height: '20px',
    },
  },

  palette,

  sizes: {
    linear: {
      small: '100px',
      medium: '144px',
      large: '200px',
      xlarge: '240px',
      xxlarge: '300px',
      full: '100%',
      auto: 'auto',
    },
    text: {
      xxsmall: '12px',
      xsmall: '13px',
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '22px',
    },
    title: {
      xxsmall: '16px',
      xsmall: '18px',
      small: '21px',
      medium: '24px',
      large: '28px',
      xlarge: '36px',
    },
    defaults: {
      linear: 'auto',
    },
  },

  fonts: {
    title: 'Nunito',
  },

  container: {
    minWidth: '300px',
    maxWidth: '1200px',
  },

  styled: {
    button: {
      padding: '16px',
      border: `1px solid ${palette.Blue}`,
      fontSize: '16px',
    },

    tabs: {
      activeBorderBottomColor: palette.Purple500,
      activeBorderBottomWidth: 2,
      tab: {
        color: 'black',
        colorActive: palette.Purple500,
        backgroundColor: 'transparent',
        backgroundColorActive: 'transparent',
        border: 'none',
        letterSpacing: '0',
        fontSize: '15px',
        padding: '20px 0',
        margin: '0 32px 0 0',
      },
    },

    input: {
      bgColor: '#1B1B1C',
      textColor: '#FFFFFF',
      border: `1px solid ${palette.Basic200}`,
      borderRadius: '15px',
      disabledColor: palette.Basic300,
      minHeight: '45px',
      customDDSeparator: {
        margin: 0,
        backgroundColor: palette.Basic200,
      },
      ddIndicatorProps: {
        pad: '8px',
        size: '10px',
      },
    },

    colors: {
      colorPrimary: palette.Blue,
      colorSecondary: 'white',
      buttonBgColor: '#1F5AE2',
      // buttonBgColor: '#03ade8',
      buttonHoverBgColor: '#03ade8',
      buttonColor: 'white',
    },
  },
};
