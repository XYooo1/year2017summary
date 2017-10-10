var nodes = [{
    "name": "云天河",
    "image": "tianhe.png"
}, {
    "name": "韩菱纱",
    "image": "lingsha.png"
}, {
    "name": "柳梦璃",
    "image": "mengli.png"
}, {
    "name": "慕容紫英",
    "image": "ziying.png"
}];
var edges = [{
    "source": 0,
    "target": 1,
    "relation": "挚友"
}, {
    "source": 0,
    "target": 2,
    "relation": "挚友"
}, {
    "source": 0,
    "target": 3,
    "relation": "挚友"
}];
var width = 600;
var height = 600;
var img_w = 77;
var img_h = 90;
var radius = 30; //圆形半径
// var width = 900;
// var height = 800;
// var img_w = 77;
// var img_h = 80;
// var radius = 30; //圆形半径

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .nodes(nodes)
    .links(edges)
    .size([width, height])
    .linkDistance(200)
    .charge(-1500)
    .start();
//连线
var edges_line = svg.selectAll("line")
    .data(edges)
    .enter()
    .append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);
//连线上面的文字
var edges_text = svg.selectAll(".linetext")
    .data(edges)
    .enter()
    .append("text")
    .attr("class", "linetext")
    .text(function(d) {
        return d.relation;
    });

// 节点是方形图片
// var nodes_img = svg.selectAll("image")
//     .data(nodes)
//     .enter()
//     .append("image")
//     .attr("width", img_w)
//     .attr("height", img_h)
//     .attr("xlink:href", function(d) {
//         return d.image;
//     })
//     .on("mouseover", function(d, i) {
//         //显示连接线上的文字
//         edges_text.style("fill-opacity", function(edge) {
//             if (edge.source === d || edge.target === d) {
//                 return 1.0;
//             }
//         });
//     })
//     .on("mouseout", function(d, i) {
//         //隐去连接线上的文字
//         edges_text.style("fill-opacity", function(edge) {
//             if (edge.source === d || edge.target === d) {
//                 return 0.0;
//             }
//         });
//     })
//     .call(force.drag);
//节点是圆形图片    
var nodes_img = svg.selectAll("image")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "circleImg")
    .attr("r", radius)
    .attr("fill", function(d, i) {
        //创建圆形图片
        var defs = svg.append("defs").attr("id", "imgdefs");

        var catpattern = defs.append("pattern")
            .attr("id", "catpattern" + i)
            .attr("height", 1)
            .attr("width", 1)

        catpattern.append("image")
            .attr("x", -(img_w / 2 - radius))
            .attr("y", -(img_h / 2 - radius))
            .attr("width", img_w)
            .attr("height", img_h)
            .attr("xlink:href", d.image)

        return "url(#catpattern" + i + ")";

    })
    .call(force.drag);

var text_dx = -20;
var text_dy = -80;
//节点上面的文字
var nodes_text = svg.selectAll(".nodetext")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "nodetext")
    .attr("dx", text_dx)
    .attr("dy", text_dy)
    .text(function(d) {
        return d.name;
    });


force.on("tick", function() {

    //限制结点的边界
    nodes.forEach(function(d, i) {
        d.x = d.x - img_w / 2  < 0 ? img_w / 2 : d.x;
        d.x = d.x + img_w / 2 > width ? width - img_w / 2 : d.x;
        d.y = d.y - img_h / 2  + text_dy/2 < 0 ? img_h / 2 -  text_dy/2: d.y;
        d.y = d.y + img_h / 2  > height ? height - img_h / 2 : d.y;
    });
    //更新连接线的位置
    edges_line.attr("x1", function(d) {
        return d.source.x;
    });
    edges_line.attr("y1", function(d) {
        return d.source.y;
    });
    edges_line.attr("x2", function(d) {
        return d.target.x;
    });
    edges_line.attr("y2", function(d) {
        return d.target.y;
    });

    //更新连接线上文字的位置
    edges_text.attr("x", function(d) {
        return (d.source.x + d.target.x) / 2;
    });
    edges_text.attr("y", function(d) {
        return (d.source.y + d.target.y) / 2;
    });


    //更新结点图片和文字
    //圆形图片
    nodes_img.attr("cx", function(d) {
        return d.x
    });
    nodes_img.attr("cy", function(d) {
        return d.y
    });
    //方形图片
    nodes_img.attr("x", function(d) {
        return d.x - img_w / 2;
    });
    nodes_img.attr("y", function(d) {
        return d.y - img_h / 2;
    });

    nodes_text.attr("x", function(d) {
        return d.x
    });
    nodes_text.attr("y", function(d) {
        return d.y + img_w / 2;
    });
});
