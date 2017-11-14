// Made by Dmitry Glinskiy, contact me at glinskiy.net
// Primitive range and summ functions
function getSumm(a,b) {
  return a + b;
};

function range(x, min, max) {
  return x >= min && x <= max;
};

function rangeShort(x, min, max) {
  return x >= min && x < max;
};


// Variables
var ageYears = 0;
var ageMonths = 0;
var ageConverted = null;
var genderSelected = null;
var tablePrimaryName = 0;
var tableSecondaryName = 0;


// Chooses B1-2 table based on age and gender
var primaryTableAgeRange = [
  0,48,52,56,60,64,68,72,76,80,84,88,92,96,102,108,114,120,126,
  132,138,144,150,156,162,168,180,192,204,228,264
];
var primaryTablePrefix = [
  'AgeUnrealisticallyYoung',
  '_40to43', '_44to47', '_48to411', '_50to53', '_54to57', '_58to511', '_60to63', '_64to67', '_68to611',
  '_70to73', '_74to77', '_78to711', '_80to85', '_86to811', '_90to95', '_96to911', '_100to105', '_106to1011',
  '_110to115', '_116to1111', '_120to125', '_126to1211', '_130to135', '_136to1311', '_140to1411',
  '_150to1511', '_160to1611', '_170to1811', '_190to2111'
];
function choosePrimaryTable () {
  let index;
  for (index = 0; index < primaryTableAgeRange.length - 1; index++) {
    if (rangeShort(ageConverted, primaryTableAgeRange[index], primaryTableAgeRange[index + 1])) {
      tablePrimaryName = 'primary_' + genderSelected + primaryTablePrefix[index];
    } else {
    };
  };
  $('.tables-primary').html(tablePrimaryName);
};

// Chooses B4-5 table based on age and gender
function chooseSecondaryTable () {
  if (range(ageConverted, 0, 47)) {
    tableSecondaryName = 'AgeUnrealisticallyYoung';
  } else if (range(ageConverted, 48, 59)) {
    tableSecondaryName = 'secondary_' + genderSelected + '_40to411';
  } else if (range(ageConverted, 60, 71)) {
    tableSecondaryName = 'secondary_' + genderSelected + '_50to511';
  } else if (range(ageConverted, 72, 95)) {
    tableSecondaryName = 'secondary_' + genderSelected + '_60to711';
  } else if (range(ageConverted, 96, 119)) {
    tableSecondaryName = 'secondary_' + genderSelected + '_80to911';
  } else if (range(ageConverted, 120, 143)) {
    tableSecondaryName = 'secondary_' + genderSelected + '_100to1111';
  } else if (range(ageConverted, 144, 179)) {
    tableSecondaryName = 'secondary_' + genderSelected + '_120to1411';
  } else if (range(ageConverted, 180, 264)) {
    tableSecondaryName = 'secondary_' + genderSelected + '_150to2111';
  } else {
    tableSecondaryName = 'AgeUnrealisticallyOld';
  }
  $('.tables-secondary').html(tableSecondaryName);
};


// Реагируем на ввод результатов субтеста
function subtestGo(a,b) {
  var lastSubtest = a;
  var summaryGroup = b;
  var lastSubtestResult = $('.sub-res-' + a).val();
  var lastSubtestScale = scanArray(tablePrimaryName, lastSubtest, lastSubtestResult);
  var lastSubtestCategory = getSubtestCategory(lastSubtestScale);
  var lastSubtestSpread = getSubtestSpread(lastSubtest);
  var lastSubtestRange = getSubtestRange(lastSubtestScale, lastSubtestSpread);

  $('.subtest-' + lastSubtest + '-scale').html(lastSubtestScale);
  $('.subtest-' + lastSubtest + '-spread').html(lastSubtestSpread);
  $('.subtest-' + lastSubtest + '-range').html(lastSubtestRange);
  $('.subtest-' + lastSubtest + '-category').html(lastSubtestCategory);

  $('.last-subtest').html(lastSubtest + ' (' + lastSubtestResult + ')'); // Debug info ToDo: Delete

  runSubtestSumm(summaryGroup);
};


// Array Scanner function
function scanArray (table, subtest, targetScore) {
  var arrayToScan = window[table][subtest];
  var scanResult = 'ошибка';

  for (var i = 0; i < arrayToScan.length; i++) {
    if (typeof(arrayToScan[i]) == 'number') {
      if (arrayToScan[i] == targetScore) {
        scanResult = i;
        break;
      } else {}
    } else if (arrayToScan[i].constructor == Array) {
      if (range(targetScore,arrayToScan[i][0],arrayToScan[i][1])) {
        scanResult = i;
        break;
      } else {}
    } else {}
  }
  return scanResult;
};

// Gets category name for results
function getSubtestCategory(scaleToPut) {
  var categoryName = 0;

  if (range(scaleToPut,0,5)) {
    categoryName = 'Знач. ниже нормы';
  } else if (range(scaleToPut,6,10)) {
    categoryName = 'Ниже нормы';
  } else if (range(scaleToPut,11,19)) {
    categoryName = 'Норма';
  } else if (range(scaleToPut,20,24)) {
    categoryName = 'Выше нормы';
  } else if (range(scaleToPut,25,35)) {
    categoryName = 'Знач. выше нормы';
  } else {
    categoryName = 'ошибка';
  }

  return categoryName;
};


// Берем данные из таблицы С1
function getSubtestSpread (subtest) {
  var ageGroup;

  if (range(ageYears, 4, 12)) {
    ageGroup = ageYears;
  } else if (range(ageYears, 13, 14)) {
    ageGroup = 13;
  } else if (range(ageYears, 15, 16)) {
    ageGroup = 14;
  } else if (range(ageYears, 17, 21)) {
    ageGroup = 15;
  } else {
    alert('Ошибка в обработке таблицы С1. Нужен дебаг: getSubtestSpread');
  }

  return table_c1[subtest][ageGroup];
};


// Определяем интервал на базе разброса
function getSubtestRange(scale, spread) {
  var lowerRange = parseInt(scale) - parseInt(spread);
  var upperRange = parseInt(scale) + parseInt(spread);
  var resultingRange =  lowerRange + ' - ' + upperRange;
  return resultingRange;
};


//
function getSummaryCategory(scaleToPut) {
  var categoryName = 0;

  if (range(scaleToPut,0,30)) {
    categoryName = 'Знач. ниже нормы';
  } else if (range(scaleToPut,31,40)) {
    categoryName = 'Ниже нормы';
  } else if (range(scaleToPut,41,59)) {
    categoryName = 'Норма';
  } else if (range(scaleToPut,60,69)) {
    categoryName = 'Выше нормы';
  } else if (range(scaleToPut,70,100)) {
    categoryName = 'Знач. выше нормы';
  } else {
    categoryName = 'ошибка';
  }

  return categoryName;
};


// Берем данные из таблицы С3
function getSummarySpread(summary) {
  var ageGroup;

  if (range(ageYears, 4, 12)) {
    ageGroup = ageYears;
  } else if (range(ageYears, 13, 14)) {
    ageGroup = 13;
  } else if (range(ageYears, 15, 16)) {
    ageGroup = 14;
  } else if (range(ageYears, 17, 21)) {
    ageGroup = 15;
  } else {
    alert('Ошибка в обработке таблицы С3. Нужен дебаг: getSummarySpread');
  }

  return table_c3[summary][ageGroup];
};


// Проверяет, готовы ли данные для суммирования, если да, запускает обновление строки саммари
function runSubtestSumm (summary) {
  var subtestsToSum = getSubtestsForSummary(summary);
  var firstSubtest = subtestsToSum[0];
  var secondSubtest = subtestsToSum[1];

  var subtestVal1 = parseInt($('.subtest-' + firstSubtest + '-scale').html());
  var subtestVal2 = parseInt($('.subtest-' + secondSubtest + '-scale').html());

  var subtestSum;

  if (subtestVal1 && subtestVal2) {
    subtestSum = getSumm(subtestVal1, subtestVal2);
    updateSubtestSum(summary, subtestSum);
  } else {
  }
};

// Узнаем, какие субтесты входят в саммари
function getSubtestsForSummary(summary) {
  var subtestsForSummary = 0;
  if (summary == 1) {
    subtestsForSummary = [1,2];
  } else if (summary == 2) {
    subtestsForSummary = [3,7];
  } else if (summary == 3) {
    subtestsForSummary = [4,5];
  } else if (summary == 4) {
    subtestsForSummary = [6,8];
  } else if (summary == 5) {
    subtestsForSummary = [6,9];
  } else {
    alert('Неправильно передается номер саммари');
  }

  return subtestsForSummary;
};


// Обновляет данные в строчке саммари
function updateSubtestSum(summaryNo, summarySum) {
  var summaryScaleIndex = parseInt(scanArray(tableSecondaryName, summaryNo, summarySum));
  var summaryScale = window[tableSecondaryName][6][summaryScaleIndex];
  var summaryPercentile = window[tableSecondaryName][7][summaryScaleIndex];
  var summaryCategory = getSummaryCategory(summaryScale);

  var summarySpread = getSummarySpread(summaryNo); // by C3
  var summaryRange = getSubtestRange(summaryScale, summarySpread);

  $('.summary-' + summaryNo + '-summ').html(summarySum);
  $('.summary-' + summaryNo + '-scale').html(summaryScale);
  $('.summary-' + summaryNo + '-spread').html(summarySpread);
  $('.summary-' + summaryNo + '-range').html(summaryRange);
  $('.summary-' + summaryNo + '-percentile').html(summaryPercentile);
  $('.summary-' + summaryNo + '-category').html(summaryCategory);

  var areSumsReady = checkSumsReady();
  areSumsReady && updateTotals();
};


// Проверяем, готовы ли все 4 суммы для финального суммирования
function checkSumsReady () {
  var sumOne = parseInt($('.summary-1-summ').html());
  var sumTwo = parseInt($('.summary-2-summ').html());
  var sumTre = parseInt($('.summary-3-summ').html());
  var sumQua = parseInt($('.summary-4-summ').html());

  if (sumOne && sumTwo && sumTre && sumQua) {
    return true;
  } else {
    return false;
  }
};

//
function setAgeConverted (a,b) {
  ageConverted = ageYears * 12 + ageMonths;
  $('.age-converted').html(ageConverted);
};


// Update grand totals, yes!
function updateTotals () {
  var table_total_scale = 'table_total_scale';
  var totalScore = parseInt($('.summary-1-scale').html()) + parseInt($('.summary-2-scale').html()) + parseInt($('.summary-3-scale').html()) + parseInt($('.summary-4-scale').html());

  var totalAgeGroup = getTotalAgeGroup(); // returns 1, 2, 3 or 4
  var totalScaleIndex = parseInt(scanArray(table_total_scale, totalAgeGroup, totalScore));
  var totalScale = window[table_total_scale][5][totalScaleIndex];
  var totalPercentile = window[table_total_scale][6][totalScaleIndex];
  var totalSpread = getSummarySpread(6);
  var totalRange = getSubtestRange(totalScale, totalSpread);
  var totalCategory = getSummaryCategory(totalScale);

  $('.total-score').html(totalScore);
  $('.total-scale').html(totalScale);
  $('.total-spread').html(totalSpread);
  $('.total-range').html(totalRange);
  $('.total-percentile').html(totalPercentile);
  $('.total-category').html(totalCategory);

  renderGraphs();
};


// Возрастной диапазон из таблицы B7
function getTotalAgeGroup (subtest) {
  if (genderSelected == 'female' && range(ageYears, 4, 9)) {
    return 1;
  } else if (genderSelected == 'female' && range(ageYears, 10, 21)) {
    return 2;
  } else if (genderSelected == 'male' && range(ageYears, 4, 9)) {
    return 3;
  } else if (genderSelected == 'male' && range(ageYears, 10, 21)) {
    return 4;
  } else {
    alert('Ошибка в getTotalAgeGroup');
  }
};


// Рендерим графики
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



$(document).ready(function(){
  // Реагируем на смену возраста
  $('#age-years').on('change', function() {
    ageYears = parseInt(this.value);
    ageMonths = parseInt($('#age-months').val());
    setAgeConverted (ageYears, ageMonths);
    ageConverted && genderSelected && choosePrimaryTable();
    ageConverted && genderSelected && chooseSecondaryTable();

    $('#age-years-copy').val(ageYears);
  });

  // Реагируем на смену возраста
  $('#age-months').on('change', function() {
    ageMonths = parseInt(this.value);
    ageYears = parseInt($('#age-years').val());
    setAgeConverted (ageYears, ageMonths);
    ageConverted && genderSelected && choosePrimaryTable();
    ageConverted && genderSelected && chooseSecondaryTable();
  });

  // Реагируем на смену пола
  $('#gender').on('change', function() {
    genderSelected = $('#gender').val();
    $('.selected-gender').html(genderSelected);
    ageConverted && genderSelected && choosePrimaryTable();
    ageConverted && genderSelected && chooseSecondaryTable();
  });

// Непонятно, как обрабатывать 9 и 9a
  $('#subtest-8-select').on('change', function() {
    var strVal = this.value;
    var strVal2 = strVal - 4;
    $('.sub-res-8').attr('onchange','subtestGo(' + strVal + ',' + strVal2 + ');');

    if (strVal == 9) {
      $('.graph-caption-8').html('8b. Полные отжимания');
    } else {
      $('.graph-caption-8').html('8a. Отжимания с колен');
    }
  });

// Реагируем на ввод возраста, имени и даты исследования, дублирем их на второй лист
  $('#test-date').on('change', function() {
   $('#test-date-copy').val(this.value);
  });

  $('#patient-name').on('change', function() {
   $('#patient-name-copy').val(this.value);
  });

  $('#doctor-name').on('change', function() {
   $('#doctor-name-copy').val(this.value);
  });

  $('#diagnosisMKB').on('change', function() {
   $('#diagnosisMKB-copy').val(this.value);
  });

  $('#gender').on('change', function() {
   $('#gender-copy').val(this.value);
  });

  $('#patient-id').on('change', function() {
   $('#patient-id-copy').val(this.value);
  });
  $('#category').on('change', function() {
   $('#category-copy').val(this.value);
  });

  // Ставим подписи специалистов
  $('.doctor-select').on('change', function() {
    let selectedDoctor = $(this).val();
    let targetSignature = $(this).attr('id');
    $("#signature-" + targetSignature).attr('class',selectedDoctor);
  });

});
