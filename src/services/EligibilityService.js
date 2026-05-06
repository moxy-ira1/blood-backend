const { ELIGIBILITY } = require('../models/enums');

class EligibilityService {
  static getHemoglobinMin() {
    return Number(process.env.HEMOGLOBIN_MIN || 12.5);
  }

  static evaluateBloodTest({ hivPositive, hepatitisBPositive, hepatitisCPositive, malariaPositive, hemoglobin }) {
    const anyPositive = Boolean(hivPositive || hepatitisBPositive || hepatitisCPositive || malariaPositive);
    const hbOk = Number(hemoglobin) >= EligibilityService.getHemoglobinMin();
    if (anyPositive || !hbOk) return ELIGIBILITY.NOT_ELIGIBLE;
    return ELIGIBILITY.ELIGIBLE;
  }
}

module.exports = { EligibilityService };

