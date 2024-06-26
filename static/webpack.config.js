const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // source file location
    entry: {
        audio: path.resolve(__dirname, "src", "js", "audio.js"),
        circle: path.resolve(__dirname, "src", "js", "circle.js"),
        colorpicker: path.resolve(__dirname, "src", "js", "colorpicker.js"),
        JZZ: path.resolve(__dirname, "src", "js", "JZZ.js"),
        Synthesizer: path.resolve(__dirname, "src", "js", "Synthesizer.js"),
        Share: path.resolve(__dirname, "src", "js", "Share.js"),
        SheetMusic: path.resolve(__dirname, "src", "js", "SheetMusic.js"),
        haptic: path.resolve(__dirname, "src", "js", "haptic.js"),
        Jsmidgen :path.resolve(__dirname, "src", "js", "jsmidgen.js"),
        vantavisual: path.resolve(__dirname, "src", "js", "vantavisual.js"),
        vantaassistive: path.resolve(__dirname, "src", "js", "vantaassistive.js"),
        ui: path.resolve(__dirname, "src", "js", "ui.js"),
        sign: path.resolve(__dirname, "src", "js", "sign.js"),
        transcribe: path.resolve(__dirname, "src", "js", "transcribe.js")
    },
    mode: "development",
    target: "web",
    devServer: {hot: false},
    output: {
        path: path.resolve(__dirname, "src", "js", "dist"),
        filename: '[name].js'
    },
   
    plugins: [new HTMLWebpackPlugin({})]
};