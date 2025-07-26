const width = 960;
const height = 600;

const svg = d3.select("#tree-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g").attr("transform", "translate(40,40)");

d3.json("data.json").then(data => {
  const root = d3.hierarchy(data);
  const treeLayout = d3.tree().size([height - 80, width - 160]);
  treeLayout(root);

  g.selectAll("line")
    .data(root.links())
    .enter()
    .append("line")
    .attr("x1", d => d.source.y)
    .attr("y1", d => d.source.x)
    .attr("x2", d => d.target.y)
    .attr("y2", d => d.target.x)
    .attr("stroke", "#555");

  g.selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("cx", d => d.y)
    .attr("cy", d => d.x)
    .attr("r", 5)
    .attr("fill", "#e74c3c");

  g.selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("x", d => d.y + 8)
    .attr("y", d => d.x + 4)
    .text(d => d.data.name)
    .attr("font-size", "14px");
});
