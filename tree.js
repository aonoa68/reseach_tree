const width = 800;
const height = 800;
const radius = width / 2;

const svg = d3.select("#tree-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${radius},${radius})`);

d3.json("data.json").then(data => {
  const root = d3.hierarchy(data);
  const tree = d3.tree().size([2 * Math.PI, radius - 100]);
  tree(root);

  // 曲線リンク
  svg.append("g")
    .selectAll("path")
    .data(root.links())
    .enter().append("path")
    .attr("fill", "none")
    .attr("stroke", d => d.target.data.color || "#ccc")
    .attr("stroke-width", 2)
    .attr("d", d3.linkRadial()
      .angle(d => d.x)
      .radius(d => d.y)
    );

  // ノード
  const node = svg.append("g")
    .selectAll("g")
    .data(root.descendants())
    .enter().append("g")
    .attr("transform", d => `
      rotate(${d.x * 180 / Math.PI - 90})
      translate(${d.y},0)
    `);

  node.append("circle")
    .attr("r", 5)
    .attr("fill", d => d.data.color || "#e74c3c");

  node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.x < Math.PI === !d.children ? 8 : -8)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
    .text(d => `${d.data.icon || ""} ${d.data.name}`)
    .style("font-size", "13px")
    .style("fill", "#333");
});
