import requests
import json
import datetime
import random
import time

link = "INSERIR LINK"

while (True):
    h = datetime.datetime.now()
    horarioAtual = h.strftime("%H:%M")
    bpm = random.randint(60, 91)

    estresse = random.randint(50, 80)
    if(estresse >= 91):
        nivelEstresse = "Muito alto"
    elif(estresse >= 71) and (estresse < 91):
        nivelEstresse = "Alto"
    elif(estresse >= 41) and (estresse < 71):
        nivelEstresse = "Médio"
    elif(estresse >= 11) and (estresse < 41):
        nivelEstresse = "Baixo"
    else:
        nivelEstresse = "Muito baixo"

    ansiedade = random.randint(1, 16)
    if (ansiedade >= 91):
        nivelAnsiedade = "Muito alto"
    elif (ansiedade >= 71) and (ansiedade < 91):
        nivelAnsiedade = "Alto"
    elif (ansiedade >= 41) and (ansiedade < 71):
        nivelAnsiedade = "Médio"
    elif (ansiedade >= 11) and (ansiedade < 41):
        nivelAnsiedade = "Baixo"
    else:
        nivelAnsiedade = "Muito baixo"

    o2 = random.randint(95, 100)
    if(o2 >= 95):
        nivelO2 = "Normal"
    elif(o2 >= 90) and (o2 < 95):
        nivelO2 = "Comprometimento respiratório"
    else:
        nivelO2 = "Hipoxêmico"

    temperatura = round(random.uniform(36.3,36.7), 1)
    if(temperatura >= 37.7):
        nivelTemperatura = "Febre"
    elif(temperatura >= 35.0) and (temperatura < 37.7):
        nivelTemperatura = "Normal"
    else:
        nivelTemperatura = "Hipotermia"

    dados = {
        'batimento': bpm,
        'horario': horarioAtual,
        'temperatura': temperatura,
        'nivelTemperatura': nivelTemperatura,
        'estresse': estresse,
        'nivelEstresse': nivelEstresse,
        'ansiedade': ansiedade,
        'nivelAnsiedade': nivelAnsiedade,
        'o2': o2, 'nivelO2': nivelO2}
    requisicao = requests.post(f'{link}/Pacientes/1/monitoramento/.json', data=json.dumps(dados))

    print("Status: ",requisicao)
    print("Gerado ID: ",requisicao.text)
    time.sleep(60)

