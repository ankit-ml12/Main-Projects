// // STEP 1 - Include Dependencies
// // Include react
// import React from 'react'

// // Include the react-fusioncharts component
// import ReactFC from 'react-fusioncharts'

// // Include the fusioncharts library
// import FusionCharts from 'fusioncharts'

// // Include the chart type
// import Chart from 'fusioncharts/fusioncharts.charts'

// // Include the theme as fusion
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// // Adding the chart and theme as dependency to the core fusioncharts
// ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

// // STEP 3 - Creating the JSON object to store the chart configurations

// const ChartComponent = ({ data }) => {
//   const chartConfigs = {
//     type: 'pie3d',
//     width: '400',
//     height: '400',
//     dataFormat: 'json',
//     dataSources: {
//       chart: {
//         caption: 'Languages',
//         theme: 'fusion',
//         decimaLs: 0,
//         pieRadius: '45%',
//       },
//       data,
//     },
//   }
//   return <ReactFC {...chartConfigs} />
// }
// export default ChartComponent
// Skip to content
// john-smilga
// /
// react-search-github-users
// Public
// Code
// Issues
// Pull requests
// 3
// Actions
// Projects
// Security
// More
// react-search-github-users/src/components/Charts/Pie.js /
// @sikrigagan
// sikrigagan Charts styling and code cleaning
//  History
//  1 contributor
// 59 lines (50 sloc)  1.59 KB
// STEP 1 - Include Dependencies
// Include react
import React from 'react'

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts'

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

// STEP 3 - Creating the JSON object to store the chart configurations

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: 'pie2d', // The chart type
    width: '100%', // Width of the chart
    height: '350', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Languages',
        captionFontColor: '#102a42',
        captionFontBold: 0,
        captionFontSize: 20,
        captionFont: 'Roboto',
        baseFont: 'Open Sans',
        baseFontSize: 16,
        baseFontColor: '#617d98',
        smartLineColor: '#617d98',
        showShadow: 0,
        showPlotBorder: 0,
        paletteColors:
          '#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA',
        use3DLighting: 0,
        useDataPlotColorForLabels: 0,
        bgColor: '#FFFFFF',
        showBorder: 0,
        decimals: 0,
        pieRadius: '45%',
      },
      // Chart Data
      data,
    },
  }

  return <ReactFC {...chartConfigs} />
}

export default ChartComponent
// Footer
// © 2023 GitHub, Inc.
// Footer navigation
// Terms
// Privacy
// Security
// Status
// Docs
// Contact GitHub
// Pricing
// API
// Training
// Blog
// About
// react-search-github-users/Pie.js at master · john-smilga/react-search-github-users
