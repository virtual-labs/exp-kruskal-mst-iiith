import { graph } from "./randomGraph.js";
import { selectedEdge } from "./randomGraph.js";
import { showEdge } from "./showEdges.js";
export let cy = cytoscape({
    container: document.getElementById('diagram'),
    elements: [
        { data: { id: '0' } },
        { data: { id: '1' } },
        { data: { id: '2' } },
        { data: { id: '3' } },
        { data: { id: '4' } },
        { data: { id: '5' } }],
    style: [
        {
            selector: 'node',
            style: {
                'background-color': 'pink',
                label: 'data(id)',
                'text-valign': 'center',
                'text-halign': 'center'
            }
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'line-color': "lightgreen",
                'width': 3,
                label: 'data(label)'
            }
        }
    ]
});
export function addEdges() {
    let visited = [];
    for (let i = 0; i < 7; i++) {
        visited[i] = [];
        for (let j = 0; j < 7; j++) {
            visited[i][j] = false;
        }
    }
    for (let node in graph) {
        let src = graph[node].source.toString();
        let dest = graph[node].target.toString();
        let weight = graph[node].weight.toString();
        let edgeId = src + ":" +dest;
        cy.add([
            { group: 'edges', data: { id: edgeId, source: src, target: dest, label: weight } }
        ]);
        showEdge(edgeId);
    }
}
cy.layout({ name: 'circle' }).run();
cy.zoomingEnabled(false);