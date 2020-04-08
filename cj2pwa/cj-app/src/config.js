export const Config = {
	"metadata": {
		"id": "MODELINFANTIL",
		"name": "MODEL INFANTIL",
		"icon": "css/images/avatars/panda.png",
		"useUpperCase": "true",
		"background": "bg3.png"
	},
	"components": [
		{
			"component": "monthComponent",
			"componentdata": "{\"month\":\"march\"}",
			"componentconfig": "{\"january\":true,\"february\":true,\"march\":true,\"april\":true,\"may\":true,\"june\":true,\"july\":true,\"august\":true,\"september\":true,\"october\":true,\"november\":true,\"december\":true}",
			"componentactions": "{\"default\":{\"onshow\":{\"action\":\"none\"},\"onplay\":{\"action\":\"video\",\"type\":\"youtube\",\"source\":\"ukRuUKW9ek0\"}}}",
			"componentvisibility": "true",
			"col": 1,
			"row": 4,
			"size_x": 3,
			"size_y": 3
		},
		{
			"component": "seasonComponent",
			"componentdata": "{\"season\":\"\"}",
			"componentconfig": "{\"spring\":true,\"summer\":true,\"autumn\":true,\"winter\":true}",
			"componentactions": "{\"default\":{\"onshow\":{\"action\":\"none\"},\"onplay\":{\"action\":\"video\",\"type\":\"youtube\",\"source\":\"wl6j9pW8i8Y\"}}}",
			"componentvisibility": "true",
			"col": 4,
			"row": 4,
			"size_x": 3,
			"size_y": 3
		},
		{
			"component": "weatherComponent",
			"componentdata": "{\"weather\":\"\"}",
			"componentconfig": "{\"sunny\":true,\"partial_sunny\":false,\"partial_cloudy\":true,\"cloudy\":false,\"rainy\":true,\"snow\":false}",
			"componentactions": "{\"default\":{\"onshow\":{\"action\":\"none\"},\"onplay\":{\"action\":\"video\",\"type\":\"youtube\",\"source\":\"BF7w-xJUlwM\"}}}",
			"componentvisibility": "true",
			"col": 7,
			"row": 1,
			"size_x": 3,
			"size_y": 3
		},
		{
			"component": "weekdayComponent",
			"componentdata": "{\"weekday\":\"monday\"}",
			"componentconfig": "{\"monday\":true,\"tuesday\":true,\"wednesday\":true,\"thursday\":true,\"friday\":true,\"saturday\":true,\"sunday\":true}",
			"componentactions": "{\"default\":{\"onshow\":{\"action\":\"none\"},\"onplay\":{\"action\":\"video\",\"type\":\"youtube\",\"source\":\"ScBcFZ5pGpA\"}}}",
			"componentvisibility": "true",
			"col": 4,
			"row": 1,
			"size_x": 3,
			"size_y": 3
		}
	]
}