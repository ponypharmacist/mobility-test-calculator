// Made by Dmitry Glinskiy, contact me at glinskiy.net
// Primitive range and summ functions
function range(x, min, max) {
  return x >= min && x <= max;
};

function getSumm(a,b) {
  return a + b;
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
