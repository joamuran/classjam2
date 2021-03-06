export const Config = {
    "metadata":{
            "id":"assemblea1",
            "name": "Configuració 1"},
            
    "components":
        [
            {
                "component": "seasonComponent",
                "componentdata": "{\"season\":\"autumn\"}",
                "componentconfig": "{\"spring\":true,\"summer\":true,\"autumn\":true,\"winter\":true}",
                "col": 3,
                "row": 4,
                "size_x": 2,
                "size_y": 2
            },
            {
                "component": "weatherComponent",
                "componentdata": "{\"weather\":\"rainy\"}",
                "componentconfig": "{\"sunny\":true,\"partial_sunny\":true,\"partial_cloudy\":true,\"cloudy\":true,\"rainy\":true,\"snow\":false,\"tempest\":false}",
                "col": 1,
                "row": 4,
                "size_x": 2,
                "size_y": 2
            },
            {
                "component": "monthComponent",
                "componentdata": "{\"month\":\"february\"}",
                "componentconfig": "{\"january\":true,\"february\":true,\"march\":true,\"april\":true,\"may\":true,\"june\":true,\"july\":true,\"august\":true,\"september\":true,\"october\":true,\"november\":true,\"december\":true}",
                "col": 5,
                "row": 2,
                "size_x": 2,
                "size_y": 2
            },
            {
                "component": "weekdayComponent",
                "componentdata": "{\"weekday\":\"tuesday\"}",
                "componentconfig": "{\"monday\":true,\"tuesday\":true,\"wednesday\":true,\"thursday\":true,\"friday\":true,\"saturday\":true,\"sunday\":true}",
                "col": 5,
                "row": 1,
                "size_x": 3,
                "size_y": 1
            },
            {
                "component": "classmatesComponent",
                "componentdata": "{\"alu01\":true,\"alu02\":true}",
                "componentconfig": "{\"alu01\":{\"img\":\"\",\"name\":\"alup1\"},\"alu02\":{\"img\":\"\",\"name\":\"alup2\"}}",
                "col": 1,
                "row": 1,
                "size_x": 4,
                "size_y": 3
            }
        ]
    }