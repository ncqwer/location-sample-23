/* eslint-disable no-undef */
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,vue}'],
    theme: {
        colors: {
            ...colors,
            grey: {
                100: 'rgb(250,252,254)',
                200: 'rgb(246,248,253)',
                300: 'rgb(244,247,254)',
                400: 'rgb(233,237,247)',
                500: 'rgb(224,229,242)',
                700: 'rgb(112,126,174)',
            },
            ['purple-blue']: {
                100: 'rgb(234,232,255)',
                300: 'rgb(185,176,255)',
                500: 'rgb(89,31,249)',
                600: 'rgb(85,28,229)',
                700: 'rgb(72,23,192)',
            },
        },
    },
    plugins: [],
};
