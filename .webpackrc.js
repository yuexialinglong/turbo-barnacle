export default {
    "entry": "./src/entries/crmInner/index.js",
    "proxy": {
        "/panda": {
            "target" : "http://192.168.40.254:8087/",
            "changeOrigin" : true,
            "pathRewrite" : { "^/panda" : "" }
        }
    },
	"extraBabelPlugins": [
		[ "import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": true } ]
	],
    "theme": "./theme-config.js",
    "hash" : true,
    "html":{
      "template" :  "./src/index.ejs",
      "title" :  "Panda ABC"
    }
}
