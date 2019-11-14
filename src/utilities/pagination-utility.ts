import moment = require('moment');
import { SearchEventsParameter } from '../business/models/parameters/search-events-parameter';

export class PaginationUtility {

    static sportsEventCondition(parameter: SearchEventsParameter) {
        return parameter.sports && parameter.sports.length > 0
            ? 'event.sport IN (:sports)'
            : 'event.sport IS NOT NULL';
    }

    static startDateEventCondition(parameter: SearchEventsParameter, setDefault: boolean) {
        const startDate = PaginationUtility.startDate(parameter, setDefault);
        return startDate != null
            ? 'event.startDate >= :startDate'
            : 'event.startDate IS NOT NULL';
    }

    static startDate(parameter: SearchEventsParameter, setDefault: boolean) {
        const todayDate = moment().format('YYYY-MM-DD').toString();
        const startDate = moment(parameter.startDate).format('YYYY-MM-DD').toString();
        const eventDate = parameter.showHistory
                         ? startDate
                         : moment().isSameOrAfter(moment(parameter.startDate))
                            ? todayDate
                            : startDate;

        return parameter.startDate
            ? eventDate
            : setDefault
                ? todayDate
                : null;
    }

}
