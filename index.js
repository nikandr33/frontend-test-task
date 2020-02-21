// Исходные данные
const invoices = {
                    "customer": "MDT",
                    "performance": [
                        {
                            "playId": "Гамлет",
                            "audience": 55,
                            "type": "tragedy"
                        }, {
                            "playId": "Ромео и Джульетта",
                            "audience": 35,
                            "type": "tragedy"
                        }, {
                            "playId": "Отелло",
                            "audience": 40,
                            "type": "comedy"
                        }
                    ]
                }

console.log(statement(invoices))

function statement(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let comedyCounter = 0;
    let result = `Счет для ${invoice.customer}:\n\n`;

    const format = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2
    }).format;

    // Рассчет счета
    for (let perfId in invoice.performance) {
        const play = invoice.performance[perfId];
        let thisAmount = 0;
        let thisPlayType = '';

        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                thisPlayType = 'Трагедия';
                if (play.audience > 30)
                    thisAmount += 1000 * (play.audience - 30);
                break;
            case "comedy":
                thisAmount = 30000;
                thisPlayType = 'Комедия';
                comedyCounter++;
                if (play.audience > 20) 
                    thisAmount += 10000 + 500 * (play.audience - 20);
                thisAmount += 300 * play.audience;
                break;
            default:
                throw new Error(`неизвестный тип: ${play.type}`);
        } 
        
        // Добавление бонусов
        volumeCredits += Math.max(play.audience - 30, 0);

        // Дополнительный бонус за каждые 10 комедий
        if (play.type === "comedy" && comedyCounter !== 0 && comedyCounter % 10 === 0) 
            volumeCredits += Math.floor(play.audience / 5);

        // Добавление стоимости постановки в итоговую стоимость
        totalAmount += thisAmount;

        // Вывод строки счета
        result += `${parseInt(perfId) + 1}. ${play.playId} (${thisPlayType}): ${format(thisAmount / 100)} (${play.audience} мест)\n`;
    }
    
    // Вывод итога счета
    result += `\nИтого с вас: ${format(totalAmount / 100)}\n`;
    result += `Вы заработали: ${volumeCredits} бонусов\n\n`;

    return result;
}