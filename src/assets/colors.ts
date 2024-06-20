export const palette = {
  black: '#000',
  white: '#fff',

  deepFir: '#183e25',
  darkGreen: '#10471d',
  dartmouthGreen: '#155D25',
  cucumber: '#006400',
  mothGreen: '#027000',
  darkSpringGreen: '#1A7531',
  officeGreen: '#008000',
  forestGreen: '#208B3A',
  pigmentGreen: '#25A344',
  darkPastelGreen: '#2DC653',
  malachiteGreen: '#4AD66D',
  freshGreens: '#44ae69',
  freshGreen: '#45af6a',
  auroraGreen: '#6CDE8B',
  hospitalGreen: '#90E6A7',
  quantumEffect: '#b4dfc3',
  slimeLime: '#B7EDC5',
  limeGreen: '#CCFF33',
  scorpionVenom: '#9EF01A',
  hypnoticGreen: '#70E001',
  candyGrass: '#38B102',
  gumdropGreen: '#33a885',

  darkToneInk: '#121212',
  chaosBlack: '#0e0f0f',
  aswadBlack: '#181a1b',
  satinDeepBlack: '#1e1f22',
  nobleBlack: '#1f1e25',
  eerieBlack: '#1F1F1F',
  youngNight: '#232323',
  direWolf: '#272727',
  nero: '#252525',
  shoeWax: '#2C2C2C',
  stretch: '#2b2d30',
  deepWell: '#2b2a33',
  phantomShip: '#2e3432',
  darkCharcoal: '#323232',
  clay: '#313537',
  jet: '#353535',
  lacqueredLiquorice: '#383838',
  bauhaus: '#3f3f3f',
  machineGunMetal: '#454545',
  littleBlackDress: '#43494c',
  hardCoal: '#656565',
  tangledWeb: '#b2b2b2',
  pinball: '#d3d3d3',

}


export const theme = {
  header: {
    BGColor: {
      default: palette.deepFir,
      light: palette.deepFir,
      dark: palette.deepFir,
    },
    color: {
      default: palette.white,
      light: palette.white,
      dark: palette.white,
    },
  },
  dashboard: {
    color: {
      default: palette.black,
      light: palette.black,
      dark: palette.white,
    },
    BGColor: {
      default: palette.pinball,
      light: palette.pinball,
      dark: palette.littleBlackDress,
    },
    toolbar: {
      BGColor: {
        default: palette.tangledWeb,
        light: palette.tangledWeb,
        dark: palette.littleBlackDress,
      },
    },
    grid: {
      widget: {
        launchDate: {
          default: palette.quantumEffect,
          light: palette.quantumEffect,
          dark: palette.dartmouthGreen,
        },
        BGColor: {
          default: palette.white,
          light: palette.white,
          dark: palette.darkCharcoal,
        },
        color: {
          default: palette.black,
          light: palette.black,
          dark: palette.white,
        },
      },
      BGColor: {
        default: palette.tangledWeb,
        light: palette.pinball,
        dark: palette.littleBlackDress,
      },
    },
  },
}


