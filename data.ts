
import { Lesson, Challenge } from './types';

export const LESSONS: Lesson[] = [
  {
    id: "intro",
    titulo: "1. Introducción y Configuración",
    icon: "fa-gear",
    contenido: `
      <h3 class="text-xl font-bold mb-2">¿Qué es PHP?</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">Es un lenguaje de código abierto de servidor que permite generar HTML. Fue creado por Rasmus Lerdorf en 1995. PHP significa Hypertext Preprocessor.</p>
      
      <h3 class="text-xl font-bold mb-2">Herramientas Necesarias</h3>
      <ul class="list-disc pl-5 mb-4 text-slate-600 space-y-2">
          <li><strong>Editor:</strong> Se recomienda Visual Studio Code.</li>
          <li><strong>Servidor:</strong> XAMPP (incluye Apache) es el entorno recomendado para Windows.</li>
          <li><strong>Ubicación:</strong> Los archivos deben guardarse en la carpeta <code>htdocs</code> dentro del directorio de instalación de XAMPP.</li>
          <li><strong>Acceso:</strong> Se visualizan a través de <code>localhost/nombre_archivo.php</code>.</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-2">Versiones</h3>
      <p class="text-slate-600">Las fuentes principales se basan en PHP 7.4 y la evolución hacia PHP 8.0, introduciendo mejoras de rendimiento y tipos más estrictos.</p>
    `,
    quiz: [
      {
        pregunta: "¿Cuál es la diferencia principal entre PHP y HTML?",
        opciones: [
          "PHP es para diseño y HTML para bases de datos",
          "PHP es un lenguaje de programación de servidor, HTML es de marcado",
          "No hay diferencia, son lo mismo"
        ],
        correcta: 1,
        retro: "PHP es un lenguaje de programación, mientras que HTML es un lenguaje de marcado para estructurar páginas web."
      },
      {
        pregunta: "¿En qué carpeta de XAMPP se deben guardar los proyectos?",
        opciones: ["public_html", "htdocs", "www"],
        correcta: 1,
        retro: "Los archivos PHP deben estar en htdocs para que el servidor Apache pueda servirlos correctamente."
      }
    ]
  },
  {
    id: "sintaxis",
    titulo: "2. Sintaxis y Variables",
    icon: "fa-code",
    contenido: `
      <h3 class="text-xl font-bold mb-2">Sintaxis Básica</h3>
      <p class="mb-4 text-slate-600">El código PHP siempre va dentro de las etiquetas <code>&lt;?php ... ?&gt;</code>. Cada instrucción debe terminar obligatoriamente con punto y coma <code>;</code>.</p>
      <p class="mb-4 text-slate-600">Para imprimir contenido hacia el HTML se utiliza la palabra clave <code>echo</code>.</p>
      
      <h3 class="text-xl font-bold mb-2">Variables</h3>
      <p class="mb-2 text-slate-600">En PHP, las variables siempre inician con el símbolo de moneda <strong>$</strong>.</p>
      <ul class="list-disc pl-5 mb-4 text-slate-600 space-y-1">
          <li><strong>Texto (Strings):</strong> Delimitados por comillas simples o dobles.</li>
          <li><strong>Números:</strong> Enteros (integers) y decimales (floats).</li>
          <li><strong>Booleanos:</strong> Representan <code>true</code> (verdadero) o <code>false</code> (falso).</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-2">Comentarios</h3>
      <p class="text-slate-600">Se utiliza <code>//</code> para comentarios de una sola línea y <code>/* ... */</code> para bloques de varias líneas.</p>
    `,
    quiz: [
      {
        pregunta: "¿Cómo se define una constante en PHP?",
        opciones: ["const MI_VALOR = 10;", "define('MI_VALOR', 10);", "var MI_VALOR = 10;"],
        correcta: 1,
        retro: "La función define() es la forma estándar de declarar constantes globales en PHP."
      },
      {
        pregunta: "¿Qué símbolo inicia una variable en PHP?",
        opciones: ["&", "#", "$"],
        correcta: 2,
        retro: "Todas las variables en PHP deben comenzar con el signo $."
      }
    ]
  },
  {
    id: "estructuras",
    titulo: "3. Arrays y Estructuras",
    icon: "fa-layer-group",
    contenido: `
      <h3 class="text-xl font-bold mb-2">Listas (Arrays Indexados)</h3>
      <p class="mb-4 text-slate-600">Se crean con la función <code>array()</code> o corchetes <code>[]</code>. Los índices de acceso inician siempre en 0.</p>
      <div class="bg-slate-800 text-white p-3 rounded mb-4 font-mono text-sm">
        $frutas = array('Manzana', 'Pera');<br>
        echo $frutas[0]; // Imprime Manzana
      </div>
      
      <h3 class="text-xl font-bold mb-2">Arrays Asociativos (Mapas)</h3>
      <p class="mb-4 text-slate-600">Permiten definir claves personalizadas para los valores usando el operador <code>=></code>.</p>
      <div class="bg-slate-800 text-white p-3 rounded mb-4 font-mono text-sm">
        $usuario = ['nombre' => 'Juan', 'edad' => 20];<br>
        echo $usuario['nombre']; // Imprime Juan
      </div>
    `,
    quiz: [
      {
        pregunta: "¿Cuál es el índice del primer elemento de un array?",
        opciones: ["1", "0", "A"],
        correcta: 1,
        retro: "En programación, casi todos los lenguajes (incluyendo PHP) inician sus índices en 0."
      }
    ]
  },
  {
    id: "logica",
    titulo: "4. Lógica y Bucles",
    icon: "fa-arrows-split-up-and-left",
    contenido: `
      <h3 class="text-xl font-bold mb-2">Operadores</h3>
      <ul class="list-disc pl-5 mb-4 text-slate-600">
        <li><code>==</code> Compara valor.</li>
        <li><code>===</code> Compara valor e idéntico tipo de dato.</li>
        <li><code>&&</code> Operador lógico Y (AND).</li>
        <li><code>||</code> Operador lógico O (OR).</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-2">Control de Flujo</h3>
      <p class="mb-2 text-slate-600">Se usan <code>if</code>, <code>else</code>, <code>elseif</code> para decisiones y <code>switch</code> para múltiples casos.</p>
      
      <h3 class="text-xl font-bold mb-2">Bucles</h3>
      <ul class="list-disc pl-5 text-slate-600">
        <li><strong>foreach:</strong> El más común para recorrer arrays.</li>
        <li><strong>while:</strong> Se ejecuta mientras una condición sea verdadera.</li>
      </ul>
    `,
    quiz: [
      {
        pregunta: "¿Qué operador revisa que dos valores sean iguales Y del mismo tipo?",
        opciones: ["==", "===", "="],
        correcta: 1,
        retro: "El triple igual (===) es el operador de identidad."
      }
    ]
  },
  {
    id: "avanzado",
    titulo: "5. Funciones y POO",
    icon: "fa-cube",
    contenido: `
      <h3 class="text-xl font-bold mb-2">Funciones</h3>
      <p class="mb-4 text-slate-600">Bloques de código reutilizables definidos con la palabra clave <code>function</code>. Pueden recibir parámetros y devolver valores con <code>return</code>.</p>
      
      <h3 class="text-xl font-bold mb-2">POO (Programación Orientada a Objetos)</h3>
      <ul class="list-disc pl-5 mb-4 text-slate-600 space-y-1">
          <li><strong>Clase:</strong> El plano o plantilla (ej: <code>class Coche</code>).</li>
          <li><strong>Objeto:</strong> La instancia física del plano (ej: <code>new Coche()</code>).</li>
          <li><strong>Constructor:</strong> Función especial <code>__construct</code> que se ejecuta al crear el objeto.</li>
          <li><strong>Propiedades:</strong> Variables dentro de una clase.</li>
          <li><strong>Métodos:</strong> Funciones dentro de una clase.</li>
      </ul>
    `,
    quiz: [
      {
        pregunta: "¿Cómo se crea una nueva instancia de una clase?",
        opciones: ["new Clase()", "create Clase()", "make Clase()"],
        correcta: 0,
        retro: "Usamos la palabra clave 'new' para instanciar objetos."
      }
    ]
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    titulo: "Reto: Hola Universo",
    descripcion: "Crea un script que imprima 'Hola Universo' seguido de un salto de línea HTML.",
    checklist: [
      "Usar etiquetas de apertura <?php",
      "Usar comando echo",
      "Incluir la etiqueta <br> para el salto de línea",
      "Terminar con punto y coma"
    ]
  },
  {
    id: 2,
    titulo: "Reto: Lista de Meses",
    descripcion: "Define un array con los 12 meses del año y muestra el mes de Marzo usando su índice.",
    checklist: [
      "Crear variable $meses",
      "Usar función array() o corchetes []",
      "Acceder al índice 2 (Marzo)",
      "Imprimir el resultado con echo"
    ]
  },
  {
    id: 3,
    titulo: "Reto: Objeto Computadora",
    descripcion: "Crea una clase llamada Computadora con propiedades como marca y modelo, y un constructor para asignarlas.",
    checklist: [
      "Definir class Computadora",
      "Declarar propiedades public $marca y public $modelo",
      "Definir function __construct($m, $mod)",
      "Crear instancia con new"
    ]
  },
  {
    id: 4,
    titulo: "Reto: Área de un Círculo",
    descripcion: "Calcula el área de un círculo dado un radio de 5 usando la fórmula: PI * r * r.",
    checklist: [
      "Definir $radio = 5",
      "Definir una constante PI",
      "Realizar la operación aritmética",
      "Imprimir el área total"
    ]
  },
  {
    id: 5,
    titulo: "Reto: Par o Impar",
    descripcion: "Escribe una función que reciba un número y devuelva si es 'Par' o 'Impar'.",
    checklist: [
      "Definir function verificar($n)",
      "Usar operador de módulo %",
      "Usar estructura if/else",
      "Retornar el texto con return"
    ]
  }
];
