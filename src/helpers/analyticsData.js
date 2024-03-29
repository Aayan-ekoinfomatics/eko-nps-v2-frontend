export const analyticsData = {
    nps: {
        cards: [
            {
                title: "Responses",
                value: 17200,
                unit: null,
            },
            {
                title: "NPS Score",
                value: 40,
                unit: null,
            },
            {
                title: "Avg NPS",
                value: 7.2,
                unit: null,
            },
            {
                title: "Promoters",
                value: 14100,
                unit: null,
            },
            {
                title: "Passives",
                value: 2100,
                unit: null,
            },
            {
                title: "Detractors",
                value: 1000,
                unit: null,
            },
        ],
        legends: {
            avg_nps: [
                { name: "Promoters", color: "#00AC69", status: true },
                { name: "Passives", color: "#4D5552", status: false },
                { name: "Detractors", color: "#DB2B39", status: false },
                { name: "Overall", color: "#0094E0", status: false },
            ],

            nps_over_time: [
                { name: "Promoters", color: "#00AC69", status: false },
                { name: "Passives", color: "#4D5552", status: false },
                { name: "Detractors", color: "#DB2B39", status: false },
                { name: "NPS", color: "#0094E0", status: true },
            ],
        },
        graphs: {
            nps_pie_bar: {
                nps_score: 49,
                promoters: 63,
                total_promoters: 1112,
                passive: 23,
                total_passive: 412,
                detractors: 14,
                total_detractors: 244,
            },
            nps_pie: [
                {
                    label: "Promoters",
                    percentage: 72,
                    color: "url(#promoterGradient)",
                },
                {
                    label: "Passives",
                    percentage: 19,
                    color: "url(#passiveGradient)",
                },
                {
                    label: "Detractors",
                    percentage: 8,
                    color: "url(#detractorGradient)",
                },
            ],
            avg_nps: [
                {
                    month: "Jun",
                    year: "2014",
                    nps: 45,
                    promoter: 59,
                    passive: 27,
                    detractor: 14,
                },
                {
                    month: "Jul",
                    year: "2014",
                    nps: 13,
                    promoter: 46,
                    passive: 21,
                    detractor: 33,
                },
                {
                    month: "Aug",
                    year: "2014",
                    nps: 10,
                    promoter: 41,
                    passive: 28,
                    detractor: 31,
                },
                {
                    month: "Sep",
                    year: "2014",
                    nps: 48,
                    promoter: 64,
                    passive: 20,
                    detractor: 16,
                },
                {
                    month: "Oct",
                    year: "2014",
                    nps: 39,
                    promoter: 56,
                    passive: 27,
                    detractor: 17,
                },
                {
                    month: "Nov",
                    year: "2014",
                    nps: 51,
                    promoter: 60,
                    passive: 32,
                    detractor: 9,
                },
                {
                    month: "Dec",
                    year: "2014",
                    nps: 51,
                    promoter: 62,
                    passive: 27,
                    detractor: 11,
                },
                {
                    month: "Jan",
                    year: "2015",
                    nps: 27,
                    promoter: 32,
                    passive: 9,
                    detractor: 5,
                },
                {
                    month: "Feb",
                    year: "2015",
                    nps: 30,
                    promoter: 30,
                    passive: 4,
                    detractor: 0,
                },
                {
                    month: "Mar",
                    year: "2015",
                    nps: 28,
                    promoter: 35,
                    passive: 14,
                    detractor: 7,
                },
                {
                    month: "Apr",
                    year: "2015",
                    nps: 48,
                    promoter: 51,
                    passive: 9,
                    detractor: 3,
                },
                {
                    month: "May",
                    year: "2015",
                    nps: 32,
                    promoter: 33,
                    passive: 12,
                    detractor: 1,
                },
                {
                    month: "Jun",
                    year: "2015",
                    nps: 30,
                    promoter: 37,
                    passive: 11,
                    detractor: 7,
                },
            ],
            nps_over_time: [
                {
                    month: "Jun",
                    year: "2014",
                    nps: 45,
                    promoter: 59,
                    passive: 27,
                    detractor: 14,
                },
                {
                    month: "Jul",
                    year: "2014",
                    nps: 13,
                    promoter: 46,
                    passive: 21,
                    detractor: 33,
                },
                {
                    month: "Aug",
                    year: "2014",
                    nps: 10,
                    promoter: 41,
                    passive: 28,
                    detractor: 31,
                },
                {
                    month: "Sep",
                    year: "2014",
                    nps: 48,
                    promoter: 64,
                    passive: 20,
                    detractor: 16,
                },
                {
                    month: "Oct",
                    year: "2014",
                    nps: 39,
                    promoter: 56,
                    passive: 27,
                    detractor: 17,
                },
                {
                    month: "Nov",
                    year: "2014",
                    nps: 51,
                    promoter: 60,
                    passive: 32,
                    detractor: 9,
                },
                {
                    month: "Dec",
                    year: "2014",
                    nps: 51,
                    promoter: 62,
                    passive: 27,
                    detractor: 11,
                },
                {
                    month: "Jan",
                    year: "2015",
                    nps: 27,
                    promoter: 32,
                    passive: 9,
                    detractor: 5,
                },
                {
                    month: "Feb",
                    year: "2015",
                    nps: 30,
                    promoter: 30,
                    passive: 4,
                    detractor: 0,
                },
                {
                    month: "Mar",
                    year: "2015",
                    nps: 28,
                    promoter: 35,
                    passive: 14,
                    detractor: 7,
                },
                {
                    month: "Apr",
                    year: "2015",
                    nps: 48,
                    promoter: 51,
                    passive: 9,
                    detractor: 3,
                },
                {
                    month: "May",
                    year: "2015",
                    nps: 32,
                    promoter: 33,
                    passive: 12,
                    detractor: 1,
                },
                {
                    month: "Jun",
                    year: "2015",
                    nps: 30,
                    promoter: 37,
                    passive: 11,
                    detractor: 7,
                },
            ],
        },
    },

    sentiment: {
        cards: [
            {
                title: "Responses",
                value: 17200,
                unit: null,
            },
            {
                title: "Sentiment Score",
                value: 40,
                unit: null,
            },

            {
                title: "Positive",
                value: 14100,
                unit: null,
            },
            {
                title: "Neutral",
                value: 2100,
                unit: null,
            },
            {
                title: "Negative",
                value: 1000,
                unit: null,
            },

            {
                title: "Extreme",
                value: 500,
                unit: null,
            },
        ],
        legends: {
            nss_over_time: [
                { name: "Positive", color: "#00AC69", status: false },
                { name: "Neutral", color: "#4D5552", status: false },
                { name: "Negative", color: "#EE6123", status: false },
                { name: "Extreme", color: "#DB2B39", status: false },
                { name: "Sentiment", color: "#0094E0", status: true },
            ],
        },
        graphs: {
            nss_pie_bar: {
                nss_score: 49,
                positives: 63,
                total_positives: 1112,
                neutrals: 23,
                total_neutrals: 412,
                negative: 14,
                total_negative: 244,
                extreme: 20,
                total_extreme: 121,
            },
            sentiment_pie: [
                {
                    label: "Positive",
                    percentage: 60,
                    color: "url(#promoterGradient)",
                },
                {
                    label: "Neutral",
                    percentage: 10,
                    color: "url(#passiveGradient)",
                },
                {
                    label: "Negative",
                    percentage: 25,
                    color: "url(#negativeGradient)",
                },
                {
                    label: "Extreme",
                    percentage: 5,
                    color: "url(#detractorGradient)",
                },
            ],

            nss_over_time: [
                {
                    month: "Jun",
                    year: "2014",
                    nss: 45,
                    positive: 59,
                    neutral: 27,
                    negative: 14,
                    extreme: 10,
                },
                {
                    month: "Jul",
                    year: "2014",
                    nss: 13,
                    positive: 46,
                    neutral: 21,
                    negative: 33,
                    extreme: 10,
                },
                {
                    month: "Aug",
                    year: "2014",
                    nss: 10,
                    positive: 41,
                    neutral: 28,
                    negative: 31,
                    extreme: 10,
                },
                {
                    month: "Sep",
                    year: "2014",
                    nss: 48,
                    positive: 64,
                    neutral: 20,
                    negative: 16,
                    extreme: 10,
                },
                {
                    month: "Oct",
                    year: "2014",
                    nss: 39,
                    positive: 56,
                    neutral: 27,
                    negative: 17,
                    extreme: 10,
                },
                {
                    month: "Nov",
                    year: "2014",
                    nss: 51,
                    positive: 60,
                    neutral: 32,
                    negative: 9,
                    extreme: 10,
                },
                {
                    month: "Dec",
                    year: "2014",
                    nss: 51,
                    positive: 62,
                    neutral: 27,
                    negative: 11,
                    extreme: 10,
                },
                {
                    month: "Jan",
                    year: "2015",
                    nss: 27,
                    positive: 32,
                    neutral: 9,
                    negative: 5,
                    extreme: 10,
                },
                {
                    month: "Feb",
                    year: "2015",
                    nss: 30,
                    positive: 30,
                    neutral: 4,
                    negative: 0,
                    extreme: 10,
                },
                {
                    month: "Mar",
                    year: "2015",
                    nss: 28,
                    positive: 35,
                    neutral: 14,
                    negative: 7,
                    extreme: 10,
                },
                {
                    month: "Apr",
                    year: "2015",
                    nss: 48,
                    positive: 51,
                    neutral: 9,
                    negative: 3,
                    extreme: 10,
                },
                {
                    month: "May",
                    year: "2015",
                    nss: 32,
                    positive: 33,
                    neutral: 12,
                    negative: 1,
                    extreme: 10,
                },
                {
                    month: "Jun",
                    year: "2015",
                    nss: 30,
                    positive: 37,
                    neutral: 11,
                    negative: 7,
                    extreme: 10,
                },
            ],
        },
    },
};