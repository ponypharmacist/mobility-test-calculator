// Variables
var ageYears = 0;
var ageMonths = 0;
var ageConverted = null;
var genderSelected = null;
var tablePrimaryName = 0;
var tableSecondaryName = 0;


// Chooses B1-2 table based on age and gender
function choosePrimaryTable () {
  if (range(ageConverted, 0, 47)) {
    tablePrimaryName = 'AgeUnrealisticallyYoung';
  } else if (range(ageConverted, 48, 51)) {
    tablePrimaryName = 'primary_' + genderSelected + '_40to43';
  } else if (range(ageConverted, 52, 55)) {
    tablePrimaryName = 'primary_' + genderSelected + '_44to47';
  } else if (range(ageConverted, 56, 59)) {
    tablePrimaryName = 'primary_' + genderSelected + '_48to411';
  } else if (range(ageConverted, 60, 63)) {
    tablePrimaryName = 'primary_' + genderSelected + '_50to53';
  } else if (range(ageConverted, 64, 67)) {
    tablePrimaryName = 'primary_' + genderSelected + '_54to57';
  } else if (range(ageConverted, 68, 71)) {
    tablePrimaryName = 'primary_' + genderSelected + '_58to511';
  } else if (range(ageConverted, 72, 75)) {
    tablePrimaryName = 'primary_' + genderSelected + '_60to63';
  } else if (range(ageConverted, 76, 79)) {
    tablePrimaryName = 'primary_' + genderSelected + '_64to67';
  } else if (range(ageConverted, 80, 83)) {
    tablePrimaryName = 'primary_' + genderSelected + '_68to611';
  } else if (range(ageConverted, 84, 87)) {
    tablePrimaryName = 'primary_' + genderSelected + '_70to73';
  } else if (range(ageConverted, 88, 91)) {
    tablePrimaryName = 'primary_' + genderSelected + '_74to77';
  } else if (range(ageConverted, 92, 95)) {
    tablePrimaryName = 'primary_' + genderSelected + '_78to711';
  } else if (range(ageConverted, 96, 101)) {
    tablePrimaryName = 'primary_' + genderSelected + '_80to85';
  } else if (range(ageConverted, 102, 107)) {
    tablePrimaryName = 'primary_' + genderSelected + '_86to811';
  } else if (range(ageConverted, 108, 113)) {
    tablePrimaryName = 'primary_' + genderSelected + '_90to95';
  } else if (range(ageConverted, 114, 119)) {
    tablePrimaryName = 'primary_' + genderSelected + '_96to911';
  } else if (range(ageConverted, 120, 125)) {
    tablePrimaryName = 'primary_' + genderSelected + '_100to105';
  } else if (range(ageConverted, 126, 131)) {
    tablePrimaryName = 'primary_' + genderSelected + '_106to1011';
  } else if (range(ageConverted, 132, 137)) {
    tablePrimaryName = 'primary_' + genderSelected + '_110to115';
  } else if (range(ageConverted, 138, 143)) {
    tablePrimaryName = 'primary_' + genderSelected + '_116to1111';
  } else if (range(ageConverted, 144, 149)) {
    tablePrimaryName = 'primary_' + genderSelected + '_120to125';
  } else if (range(ageConverted, 150, 155)) {
    tablePrimaryName = 'primary_' + genderSelected + '_126to1211';
  } else if (range(ageConverted, 156, 161)) {
    tablePrimaryName = 'primary_' + genderSelected + '_130to135';
  } else if (range(ageConverted, 162, 167)) {
    tablePrimaryName = 'primary_' + genderSelected + '_136to1311';
  } else if (range(ageConverted, 168, 179)) {
    tablePrimaryName = 'primary_' + genderSelected + '_140to1411';
  } else if (range(ageConverted, 180, 191)) {
    tablePrimaryName = 'primary_' + genderSelected + '_150to1511';
  } else if (range(ageConverted, 192, 203)) {
    tablePrimaryName = 'primary_' + genderSelected + '_160to1611';
  } else if (range(ageConverted, 204, 227)) {
    tablePrimaryName = 'primary_' + genderSelected + '_170to1811';
  } else if (range(ageConverted, 228, 264)) {
    tablePrimaryName = 'primary_' + genderSelected + '_190to2111';
  } else {
    tablePrimaryName = 'AgeUnrealisticallyOld';
  }
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
