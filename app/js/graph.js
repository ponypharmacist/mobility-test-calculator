// Made by Dmitry Glinskiy, contact me at glinskiy.net
function renderGraphs() {
  renderTotalGraphs();
  renderSummaryGraphs();
  renderSubtestGraphs();
};

function renderTotalGraphs() {
    var percentModifier = 1.4285;
    var graphTotalScale = parseInt($('.total-scale').html());
    var graphTotalSpread = parseInt($('.total-spread').html());
    var graphWidth = graphTotalSpread * 2 * percentModifier;
    var graphPosition = (graphTotalScale - 20 - graphTotalSpread) * percentModifier;

    $('.graph-total-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
    $('.graph-total-value').html(graphTotalScale + '±' + graphTotalSpread);
};

function renderSummaryGraphs() {
  for (var i = 1; i < 5; i++) {
    var percentModifier = 1.4285;
    var graphSummaryScale = readSummaryScale(i);
    var graphSummarySpread = readSummarySpread(i);
    var graphWidth = graphSummarySpread * 2 * percentModifier;
    var graphPosition = (graphSummaryScale - 20 - graphSummarySpread) * percentModifier;

    $('.graph-summary-' + i + '-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
    $('.graph-summary-' + i + '-value').html(graphSummaryScale + '±' + graphSummarySpread);
  }
};

function renderSubtestGraphs() {
  for (var i = 1; i < 9; i++) {
    var percentModifier = 1.4285;
    var graphSubtestScale = readSubtestScale(i);
    var graphSubtestSpread = readSubtestSpread(i);
    var graphWidth = graphSubtestSpread * 4 * percentModifier;
    var graphPosition = (graphSubtestScale - graphSubtestSpread) * 2 * percentModifier;

    $('.graph-subtest-' + i + '-value').css({'width':graphWidth + '%', 'left':graphPosition + '%'});
    $('.graph-subtest-' + i + '-value').html(graphSubtestScale + '±' + graphSubtestSpread);
  }
};

function readSubtestScale(subtestNumber) {
  return parseInt($('.subtest-' + subtestNumber + '-scale').html());
};

function readSubtestSpread(subtestNumber) {
  return parseInt($('.subtest-' + subtestNumber + '-spread').html());
};

function readSummaryScale(summaryNumber) {
  return parseInt($('.summary-' + summaryNumber + '-scale').html());
};

function readSummarySpread(summaryNumber) {
  return parseInt($('.summary-' + summaryNumber + '-spread').html());
};
