import allure from "@wdio/allure-reporter"; 
import logger from "./logger";

/**
 * Global reporter used for both logger and Allure.
 * Currently added message goes as a arg to .addStep() of allure, add more param as required
 * Allure can ignore certain steps such as retry steps
 * @param testid : this.testid or NA. This is a mandatory field
 * @param loglevel 
 * @param toAllure default true
 * @param msg 
 * @todo 
 * 1. Add more param of allure reporter like add issue (to add a JIRA issue..etc)
 */
function addStep(testid, loglevel, msg, toAllure, issueid) {
    const validLogLevels = ["info", "debug", "warn", "error"];
    
    if (!testid) throw new Error(`Invalid testid: ${testid} field to report step`);
    if (!msg) logger.error(`Given message: ${msg} is not valid to report`);
    if (!validLogLevels.includes(loglevel)) logger.error(`Given loglevel: ${loglevel} is invalid and should be one of these values: ${validLogLevels.join(', ')}`);

    try {
        switch (loglevel) {
            case "info":
                logger.info(`[${testid}]: ${msg}`);
                break;
            case "debug":
                logger.debug(`[${testid}]: ${msg}`);
                break;
            case "warn":
                logger.warn(`[${testid}]: ${msg}`);
                break;
            case "error":
                logger.error(`[${testid}]: ${msg}`);
                allure.addStep(msg)
                break;
            default:
                break;
        }

        if (toAllure && loglevel !== "error") {
            allure.addStep(msg); // Paso normal sin error
        }

        if (issueid) {
            allure.addIssue(issueid);
        }

    } catch (err) {
        throw new Error(`Error reporting reporter step: ${err}`);
    }
}

export default { addStep };
