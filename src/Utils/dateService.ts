import Moment from 'moment';
import { S3Services } from './s3Services';

const TOTAL_TENURE = 365;
const DATE_FORMAT = 'DD-MM-YYYY';

export class DateService {

    getFormattedDate(date: string, format?: string): string {
        try {
            let formattedDate: string = '';
            if (date && date.trim()) {
                let newDate = new Date(date);
                formattedDate = newDate.toISOString().substring(0, 10);
                if (format) {
                    formattedDate = Moment(formattedDate).format(format)
                } else if (import.meta.env.VITE_MOMENT_DATE_FORMAT) {
                    formattedDate = Moment(formattedDate).format(import.meta.env.VITE_MOMENT_DATE_FORMAT);
                }
            }
            return formattedDate;
        } catch (ex) {
            console.log("Exception in DateService: ", ex);
        }
        return date;
    }

    getAge(userAge: string): string {
        let age: string | number = "";
        try {
            let date = new Date();
            let newUserAge = new Date(userAge);
            let newUserDate = newUserAge.toISOString().substring(0, 10);
            let dates = newUserDate.split("-");

            let userday = Number(dates[2]);
            let usermonth = Number(dates[1]);
            let useryear = Number(dates[0]);

            let curday = date.getDate();
            let curmonth = date.getMonth() + 1;
            let curyear = date.getFullYear();

            age = curyear - useryear;

            if ((curmonth < usermonth) || ((curmonth == usermonth) && curday < userday)) {
                age--;
            }
        } catch (ex) {
            console.log("Exception in getAge: ", ex);
        }
        return age.toString();
    }

    computeDays(dt1?: string, dt2?: string): number {
        var date2 = dt2 ? Moment(dt2, DATE_FORMAT) : Moment();
        var date1 = dt1 ? Moment(dt1, DATE_FORMAT) : Moment();
        return date2.diff(date1, 'days');
    }

    async getSubscriptionRingObj(patientId: string) {
        const info: any = await new S3Services().getObject(`pms-ql-user/${patientId}/subscriptionDetails.json`, "", {});
        ["StartDate", "EndDate", "TreatmentStartDate", "TreatmentEndDate"].forEach(a => {
            info[a] = info[a] ? info[a].trim() : info[a];
        });

        if (info.StartDate) {
            let elapsedTenure = this.computeDays(info.StartDate);
            info.elapsedTenure = elapsedTenure && elapsedTenure > 0 ? elapsedTenure * 100 / TOTAL_TENURE : 0;
        } else {
            info.elapsedTenure = 0;
        }

        if (info.EndDate) {
            let subscriptionTenure = this.computeDays(undefined, info.EndDate);
            info.subscriptionTenure = subscriptionTenure && subscriptionTenure > 0 ? subscriptionTenure * 100 / TOTAL_TENURE : 0;
        } else {
            info.subscriptionTenure = 0;
        }

        if (info.EndDate && info.TreatmentEndDate) {
            let treatmentTenure = this.computeDays(info.EndDate, info.TreatmentEndDate);
            info.treatmentTenure = treatmentTenure && treatmentTenure > 0 ? treatmentTenure * 100 / TOTAL_TENURE : 0;
        } else {
            info.treatmentTenure = 0;
        }
        if (info.elapsedTenure >= 100) {
            info.elapsedTenure = 100;
            info.subscriptionTenure = 0;
            info.treatmentTenure = 0;
        } else if (info.elapsedTenure + info.subscriptionTenure >= 100) {
            info.subscriptionTenure = 100 - info.elapsedTenure;
            info.treatmentTenure = 0;
        } else if (info.elapsedTenure + info.subscriptionTenure + info.treatmentTenure >= 100) {
            info.treatmentTenure = 100 - info.elapsedTenure - info.subscriptionTenure;
        }
        ['elapsedTenure', 'subscriptionTenure', 'treatmentTenure'].forEach(key => {
            if (info[key] < 0) {
                info[key] = 0;
            }
        });
        console.log('Subscription Ring: ', info);
        return info;
    }
}