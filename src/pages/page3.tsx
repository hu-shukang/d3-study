import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Page3 = () => {
  const containerRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const dataset = [
      [50, 20],
      [480, 90],
      [250, 50],
      [100, 30],
      [330, 95],
      [410, 12],
      [475, 44],
      [25, 67],
      [85, 21],
      [220, 88],
    ];
    const width = 300;
    const height = 200;
    const padding = { left: 30, right: 30, top: 20, bottom: 20 };
    const xMax = d3.max(dataset, d => d[0]) ?? 0;
    const yMax = d3.max(dataset, d => d[1]) ?? 0;
    const xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([padding.left, width - padding.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - padding.bottom, padding.top]);
    const rScale = d3.scaleLinear().domain([0, yMax]).range([4, 10]);
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(4);
    const svg = d3.select(containerRef.current);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - padding.bottom})`)
      .call(xAxis);

    svg.append('g').attr('transform', `translate(${padding.left}, 0)`).call(yAxis);
    svg.attr('width', width).attr('height', height);
    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', d => rScale(d[1]))
      .attr('fill', 'red');
    return () => {
      containerRef.current.innerHTML = '';
    };
  }, []);

  return <svg ref={containerRef} style={{ padding: '20px' }}></svg>;
};

export default Page3;
