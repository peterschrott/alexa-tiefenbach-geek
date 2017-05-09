'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.bfd94004-d598-471a-abe6-69ea9e330790';
var SKILL_NAME = 'Tiefenbach Geek';

const languageStrings = {
    'de-DE': {
        translation: {
            FACTS: [
                'Tienfenbach hat 1969 Einwohner.',
                'Fast schon Bergluf: Tienfenbach liegt 527 Meter über dem Meeresspiegel.',
                'Das Dorf Tiefenbach ist in 18 Ortsteile untergliedert.',
                'Der Bürgermeister ist Ludwig Prögler.',
                'Es gibt zwei Museen in Tiefenbach. Das Museum ehemalige Klöppelschule und das Ludwig Gebhard Museum.',
                'Die Postleitzahl von Tienfenbach ist 93464.',
                'Tiefenbach ist eine Gemeinde im Oberpfälzer Landkreis Cham.',
                'Tiefenbach liegt in der Region Regensburg im „Dreiwäldereck“ Bayerischer Wald, Böhmerwald und Oberpfälzer Wald.',
                'Tiefenbach ist eine Gemeinde im Landkreis Cham.',
                'Tiefenbach liegt im Regierungsbezirk Oberpfalz.',
                'Das Dorfzentrum liegt 49 Grad, 26 Minuten und 15 Sekunden Nord und 12 Grad, 35 Minuten und 22 Sekunden Ost.',
                'Tiefenbach ist die nördlichst gelegene Gemeinde im Landkreis Cham.',
                'Die Gemeinde grenzt im Süden an die Gemeinden Rötz, Schönthal und Treffelstein, im Nordwesten an den Landkreis Schwandorf, sowie im Osten an Tschechien.',
                'Die Gemeindefläche beträgt 5,8 quadrat Kilometer.',
                'Erfrischung kann man im Waldbad am Ortsrand finden.',
                'Der älteste schriftliche Beleg zu Tienfenbach ist aus dem Jahre 1285.',
                'Die Bezeichnung Tiefenbach bedeutet laut von Reitzenstein einen Ort, der tief am Bach gelegen ist.',
            ],
            SKILL_NAME: 'Fakten über Tiefenbach',
            GET_FACT_MESSAGE: 'Hier ist dein Fakt: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über Tiefenbach, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Servus!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
