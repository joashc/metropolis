import metropolisHastings from "./metropolis.js";
import drawContour from "./drawContour.js";
import ChainDist from "./ChainDist.js";

function transpose(m){return zeroFill(m.reduce(function(m,r){return Math.max(m,r.length)},0)).map(function(r,i){return zeroFill(m.length).map(function(c,j){return m[j][i]})})}function zeroFill(n){return new Array(n+1).join("0").split("").map(Number)}

export default function genMetroDist(iterations, xDomain, yDomain, width, numPoints, variance, acceptFunc) {
    // Generate data 
    const chain = metropolisHastings(iterations,variance,acceptFunc);
    return transpose(ChainDist(xDomain, yDomain, numPoints, chain));
}

onmessage = function(e) {
  let acceptPercent = 0; 
  let setPercent = percent => acceptPercent = percent;
  const chainDist = genMetroDist(...e.data, setPercent);
  postMessage([chainDist, acceptPercent]);
}
