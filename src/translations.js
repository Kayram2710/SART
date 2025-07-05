// src/translations.js
export const strings = {
  /* ---------- ENGLISH ---------- */
  en: {
    /* -------- Main Menu -------- */
    welcome:        'Welcome to SART',
    startTest:      'Start Test',
    showCfg:        'Show Test Configurations',
    hideCfg:        'Hide Test Configurations',
    skipTut:        'Skip Tutorial',
    resetDefaultsQ: 'Reset all settings to default? This will reload the page.',
    reset:          'Reset to Default',

    /* -------- Global dialogs -------- */
    backConfirm:    'Are you sure you want to go back? You will lose all unsaved data.',
    pwdPrompt:      'Enter password to view results:',
    pwdWrong:       'Incorrect password.',
    fileNamePrompt: 'Enter a file name',

    /* -------- Countdown -------- */
    testWillStart:  'Test will start in...',
    go:             'Go!',

    /* -------- Tutorial texts -------- */
    tut1l1: 'Welcome to the SART examination.',
    tut1l2: 'During this test, you will be shown sequences that look like the following:',
    tut2l1: 'Your task is simple,',
    tut2l2: 'As soon as the * turns bold,',
    tut2l3: 'Click the Go button:',
    tut3l1: nb => `However, if the number shown is ${nb},`,
    tut3l2: 'Do not click the button,',
    tut3l3: 'Let the time run out instead:',
    tut4l1: 'Now that the instructions are clear,',
    tut4l2: 'Are you ready to start the test?',
    start:  'Start Test',

    /* -------- Sequencer -------- */
    goButton: 'GO',

    /* -------- Completion screen -------- */
    testComplete: 'Test Complete!',
    checkResults: 'Check Results',

    /* -------- Results (UI) -------- */
    results:     'Results',
    score:       'Score',
    accuracy:    'Accuracy',
    avgTime:     'Average Response Time',
    best:        'Best',
    worst:       'Worst',
    saveData:    'Save Data',
    returnMenu:  'Return to Menu',

    /* -------- Results — reasons -------- */
    reasonNonTargetClick:    'Clicked Button on Non-Target',
    reasonTargetTimeout:     'Timed Out on Target',
    reasonTargetClick:       'Clicked Button on Target',
    reasonNonTargetTimeout:  'Timed Out on Non-Target',
    reasonTooEarly:          'Clicked Button Too Early',
    timedOut:                'Timed Out',
    tooEarly:                'Too Early',
    na:                      'N/A',
    correct:                 'Correct',
    incorrect:               'Incorrect',

    /* -------- Table headers -------- */
    numberShown:   'Number Shown',
    totalClick:    'Total Time To Click',
    responseTime:  'Response Time',
    reason:        'Reason',

    /* -------- CSV headings -------- */
    csvOverview:   'Results Overview',
    csvSpec:       'Test Configuration Specs',
    csvLength:     'Test Length',
    csvTarget:     'Target Number',
    csvSpacing:    'Target Spacing',
    csvInit:       'Initial Display Time (ms)',
    csvMask:       'Mask Time (ms)',
    csvResp:       'Response Window (ms)',
    csvNumberShown:'Number Shown',
    csvTotalMs:    'Total Time To Click Button (ms)',
    csvAdjMs:      'Response Time (ms)',
    csvScore:      'Score',
    csvReason:     'Reason',
    csvTotalText:  'Total Time To Click Button (ms) - Textually Aided',
    csvAdjText:    'Response Time (ms) - Textually Aided',
    csvScoreText:  'Score - Textually Aided',

    /* field labels / descriptions */
    cfgLengthLabel: 'Test Length',
    cfgLengthDesc:  'Number of values displayed in the sequence.',
    cfgTargetLabel: 'Target Number',
    cfgTargetDesc:  'The number the user must respond to.',
    cfgSpacingLabel:'Target Spacing',
    cfgSpacingDesc: 'Minimum non-targets between each target.',
    cfgInitLabel:   'Initial Display Time (ms)',
    cfgInitDesc:    'Duration to show number before masking.',
    cfgMaskLabel:   'Mask Time (ms)',
    cfgMaskDesc:    'Duration of normal asterisk before bold.',
    cfgRespLabel:   'Response Window (ms)',
    cfgRespDesc:    'Time allowed for response before timeout.',

    /* collapse button text */
    showCfg: 'Show Test Configurations',
    hideCfg: 'Hide Test Configurations',

  },

  /* ---------- ESPAÑOL ---------- */
  es: {
    /* -------- Menú principal -------- */
    welcome:        'Bienvenido a SART',
    startTest:      'Comenzar prueba',
    showCfg:        'Mostrar configuraciones de prueba',
    hideCfg:        'Ocultar configuraciones de prueba',
    skipTut:        'Omitir tutorial',
    resetDefaultsQ: '¿Restablecer todos los ajustes por defecto? La página se recargará.',
    reset:          'Restablecer valores',

    /* -------- Diálogos globales -------- */
    backConfirm:    '¿Seguro que deseas volver? Perderás los datos no guardados.',
    pwdPrompt:      'Introduzca la contraseña para ver los resultados:',
    pwdWrong:       'Contraseña incorrecta.',
    fileNamePrompt: 'Introduzca un nombre de archivo',

    /* -------- Cuenta atrás -------- */
    testWillStart:  'La prueba comienza en...',
    go:             '¡Vamos!',

    /* -------- Tutorial -------- */
    tut1l1: 'Bienvenido al examen SART.',
    tut1l2: 'Durante esta prueba verás secuencias como la siguiente:',
    tut2l1: 'Tu tarea es sencilla,',
    tut2l2: 'Cuando el * se vuelva negrita,',
    tut2l3: 'Haz clic en el botón Go:',
    tut3l1: nb => `Sin embargo, si el número mostrado es ${nb},`,
    tut3l2: 'No hagas clic,',
    tut3l3: 'Deja que se agote el tiempo:',
    tut4l1: 'Ahora que las instrucciones están claras,',
    tut4l2: '¿Listo para empezar la prueba?',
    start:  'Iniciar Prueba',

    /* -------- Secuenciador -------- */
    goButton: 'GO',

    /* -------- Pantalla final -------- */
    testComplete: '¡Prueba completada!',
    checkResults: 'Ver resultados',

    /* -------- Resultados (UI) -------- */
    results:     'Resultados',
    score:       'Puntuación',
    accuracy:    'Precisión',
    avgTime:     'Tiempo medio de respuesta',
    best:        'Mejor',
    worst:       'Peor',
    saveData:    'Guardar datos',
    returnMenu:  'Volver al menú',

    /* -------- Razones -------- */
    reasonNonTargetClick:    'Clic en un no-objetivo',
    reasonTargetTimeout:     'Tiempo agotado en objetivo',
    reasonTargetClick:       'Clic en el objetivo',
    reasonNonTargetTimeout:  'Tiempo agotado en no-objetivo',
    reasonTooEarly:          'Clic demasiado pronto',
    timedOut:                'Tiempo agotado',
    tooEarly:                'Demasiado pronto',
    na:                      'N/D',
    correct:                 'Correcto',
    incorrect:               'Incorrecto',

    /* -------- Encabezados de tabla -------- */
    numberShown:   'Número mostrado',
    totalClick:    'Tiempo total al clic',
    responseTime:  'Tiempo de respuesta',
    reason:        'Motivo',

    /* -------- CSV -------- */
    csvOverview:   'Resumen de resultados',
    csvSpec:       'Especificaciones de la prueba',
    csvLength:     'Duración de la prueba',
    csvTarget:     'Número objetivo',
    csvSpacing:    'Espaciado del objetivo',
    csvInit:       'Tiempo de presentación inicial (ms)',
    csvMask:       'Tiempo de máscara (ms)',
    csvResp:       'Ventana de respuesta (ms)',
    csvNumberShown:'Número mostrado',
    csvTotalMs:    'Tiempo total al clic (ms)',
    csvAdjMs:      'Tiempo de respuesta (ms)',
    csvScore:      'Puntuación',
    csvReason:     'Motivo',
    csvTotalText:  'Tiempo total al clic (ms) - textual',
    csvAdjText:    'Tiempo de respuesta (ms) - textual',
    csvScoreText:  'Puntuación - textual',

    /* etiquetas / descripciones */
    cfgLengthLabel: 'Duración de la prueba',
    cfgLengthDesc:  'Cantidad de valores que se mostrarán en la secuencia.',
    cfgTargetLabel: 'Número objetivo',
    cfgTargetDesc:  'Número al que el usuario debe responder.',
    cfgSpacingLabel:'Espaciado del objetivo',
    cfgSpacingDesc: 'Mínimo de no-objetivos entre cada objetivo.',
    cfgInitLabel:   'Tiempo inicial de presentación (ms)',
    cfgInitDesc:    'Duración que se muestra el número antes de enmascarar.',
    cfgMaskLabel:   'Tiempo de máscara (ms)',
    cfgMaskDesc:    'Duración del asterisco normal antes del negrita.',
    cfgRespLabel:   'Ventana de respuesta (ms)',
    cfgRespDesc:    'Tiempo permitido para responder antes de agotar.',

    /* texto de colapso */
    showCfg: 'Mostrar configuraciones de prueba',
    hideCfg: 'Ocultar configuraciones de prueba',
  }
};
