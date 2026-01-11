
import React, { useState, useEffect } from 'react';
import { LESSONS, CHALLENGES } from './data';
import { Lesson, QuizQuestion } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'lessons' | 'quiz' | 'challenges' | 'help'>('home');
  const [points, setPoints] = useState<number>(0);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[] | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean, message: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  useEffect(() => {
    const savedPoints = localStorage.getItem('cbtis_php_points');
    if (savedPoints) setPoints(parseInt(savedPoints));

    const savedChallenges = localStorage.getItem('cbtis_php_challenges');
    if (savedChallenges) setCompletedChallenges(JSON.parse(savedChallenges));
  }, []);

  const updatePoints = (amount: number) => {
    setPoints(prev => {
      const newPoints = prev + amount;
      localStorage.setItem('cbtis_php_points', newPoints.toString());
      return newPoints;
    });
  };

  const toggleChallenge = (id: number) => {
    setCompletedChallenges(prev => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter(i => i !== id);
      } else {
        next = [...prev, id];
        updatePoints(15);
      }
      localStorage.setItem('cbtis_php_challenges', JSON.stringify(next));
      return next;
    });
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (!currentQuiz) return;
    const question = currentQuiz[quizIndex];
    if (optionIdx === question.correcta) {
      setQuizFeedback({ isCorrect: true, message: `¡Correcto! ${question.retro}` });
      updatePoints(10);
    } else {
      setQuizFeedback({ isCorrect: false, message: `Incorrecto. ${question.retro}` });
    }
  };

  const nextQuestion = () => {
    if (!currentQuiz) return;
    setQuizFeedback(null);
    if (quizIndex < currentQuiz.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setCurrentQuiz(null);
      setQuizIndex(0);
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-indigo-900 text-white flex flex-col sticky top-0 md:h-screen z-50">
        <div className="p-6 text-center border-b border-indigo-800">
          <h1 className="text-xl font-bold tracking-tight">CBTis 187</h1>
          <p className="text-indigo-300 text-xs font-medium uppercase mt-1">PHP Academy</p>
        </div>
        
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {[
            { id: 'home', label: 'Inicio', icon: 'fa-house' },
            { id: 'lessons', label: 'Lecciones', icon: 'fa-book-open' },
            { id: 'quiz', label: 'Evaluación', icon: 'fa-vial-circle-check' },
            { id: 'challenges', label: 'Retos', icon: 'fa-trophy' },
            { id: 'help', label: 'Ayuda', icon: 'fa-circle-question' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setSelectedLesson(null);
                setCurrentQuiz(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-indigo-700 shadow-lg text-white' : 'text-indigo-200 hover:bg-indigo-800'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 bg-indigo-950">
          <div className="bg-indigo-900/50 p-4 rounded-xl border border-indigo-800 text-center">
            <p className="text-indigo-400 text-xs uppercase font-bold tracking-widest mb-1">Mi Puntaje</p>
            <p className="text-2xl font-black text-white">{points} pts</p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 max-w-5xl mx-auto w-full">
        
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            <header className="mb-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Bienvenido, Alumno</h2>
              <p className="text-slate-500 max-w-2xl">Esta plataforma interactiva contiene el material oficial de PHP extraído del Video "PHP en 30 Minutos" y la "Guía Práctica". ¡Comienza a aprender y gana puntos!</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <i className="fa-solid fa-graduation-cap text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Progreso del Curso</h3>
                <p className="text-slate-500 mb-6 text-sm">Has completado {completedChallenges.length} de {CHALLENGES.length} retos prácticos.</p>
                <button 
                  onClick={() => setActiveTab('lessons')}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors"
                >
                  Continuar lecciones
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                  <i className="fa-solid fa-star text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Retos Sugeridos</h3>
                <p className="text-slate-500 mb-6 text-sm">Resuelve problemas reales y demuestra tus habilidades en PHP de servidor.</p>
                <button 
                  onClick={() => setActiveTab('challenges')}
                  className="border-2 border-emerald-600 text-emerald-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-colors"
                >
                  Ver retos
                </button>
              </div>
            </div>

            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className="fa-solid fa-bolt text-amber-500"></i>
                Contenido del Módulo
              </h3>
              <div className="space-y-4">
                {LESSONS.map((lesson) => (
                  <div key={lesson.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                        <i className={`fa-solid ${lesson.icon}`}></i>
                      </div>
                      <span className="font-semibold text-slate-700">{lesson.titulo}</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedLesson(lesson); setActiveTab('lessons'); }}
                      className="text-indigo-600 hover:text-indigo-800 font-bold text-sm"
                    >
                      Leer <i className="fa-solid fa-chevron-right ml-1"></i>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW: LESSONS */}
        {activeTab === 'lessons' && (
          <div className="animate-fadeIn">
            {!selectedLesson ? (
              <>
                <h2 className="text-3xl font-bold mb-8">Micro-lecciones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {LESSONS.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      onClick={() => setSelectedLesson(lesson)}
                      className="bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <i className={`fa-solid ${lesson.icon} text-lg`}></i>
                        </div>
                        <h3 className="font-bold text-lg">{lesson.titulo}</h3>
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2">Explora los conceptos fundamentales de este tema...</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="mb-8 flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                >
                  <i className="fa-solid fa-arrow-left"></i> Volver a la lista
                </button>
                <div className="prose prose-slate max-w-none">
                  <header className="mb-10 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                       <i className={`fa-solid ${selectedLesson.icon} text-3xl text-indigo-600`}></i>
                       <h2 className="text-4xl font-black text-slate-900 m-0">{selectedLesson.titulo}</h2>
                    </div>
                  </header>
                  <div dangerouslySetInnerHTML={{ __html: selectedLesson.contenido }} />
                </div>
                <div className="mt-12 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-indigo-900 text-lg">¿Listo para una prueba?</h4>
                    <p className="text-indigo-700 text-sm">Pon a prueba lo aprendido en esta lección.</p>
                  </div>
                  <button 
                    onClick={() => { setCurrentQuiz(selectedLesson.quiz); setActiveTab('quiz'); }}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                  >
                    Iniciar Quiz de la Lección
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="animate-fadeIn">
            {!currentQuiz ? (
              <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-6">
                   <i className="fa-solid fa-vial-circle-check text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold mb-4">Evaluación de Conocimientos</h2>
                <p className="text-slate-500 mb-8">Selecciona un tema para iniciar la evaluación basada en preguntas de entrevista técnica y conceptos del curso.</p>
                <div className="space-y-3">
                  {LESSONS.map((lesson) => (
                    <button 
                      key={lesson.id}
                      onClick={() => { setCurrentQuiz(lesson.quiz); setQuizIndex(0); }}
                      className="w-full bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-400 font-bold text-slate-700 flex justify-between items-center group transition-all"
                    >
                      <span>Quiz: {lesson.titulo}</span>
                      <i className="fa-solid fa-play text-indigo-400 group-hover:text-indigo-600"></i>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-indigo-600">Pregunta {quizIndex + 1} de {currentQuiz.length}</h3>
                  <div className="flex gap-1">
                    {currentQuiz.map((_, i) => (
                      <div key={i} className={`h-2 w-8 rounded-full ${i === quizIndex ? 'bg-indigo-600' : (i < quizIndex ? 'bg-emerald-400' : 'bg-slate-200')}`}></div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <p className="text-xl font-bold text-slate-800 mb-8 leading-snug">{currentQuiz[quizIndex].pregunta}</p>
                  
                  <div className="space-y-4 mb-8">
                    {currentQuiz[quizIndex].opciones.map((opt, idx) => (
                      <button 
                        key={idx}
                        disabled={quizFeedback !== null}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium ${
                          quizFeedback === null 
                          ? 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30' 
                          : (idx === currentQuiz[quizIndex].correcta ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-100 opacity-50')
                        }`}
                      >
                        <span className="inline-block w-8 h-8 rounded-lg bg-slate-100 text-slate-500 text-center leading-8 mr-3 font-bold">{String.fromCharCode(65 + idx)}</span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {quizFeedback && (
                    <div className={`p-6 rounded-2xl mb-8 animate-bounceIn ${quizFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-rose-100 text-rose-900 border border-rose-200'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <i className={`fa-solid ${quizFeedback.isCorrect ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'} text-xl`}></i>
                        <span className="font-bold">{quizFeedback.isCorrect ? '¡Excelente trabajo!' : '¡Oh no!'}</span>
                      </div>
                      <p className="text-sm opacity-90 leading-relaxed">{quizFeedback.message}</p>
                    </div>
                  )}

                  {quizFeedback && (
                    <button 
                      onClick={nextQuestion}
                      className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-colors"
                    >
                      {quizIndex < currentQuiz.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="animate-fadeIn">
            <header className="mb-10">
              <h2 className="text-3xl font-bold mb-2">Retos Prácticos</h2>
              <p className="text-slate-500">Basados en los retos sugeridos en la Guía Práctica de PHP. Completa los criterios y gana 15 puntos por cada reto finalizado.</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
              {CHALLENGES.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                  <div className={`p-1 h-2 ${completedChallenges.includes(challenge.id) ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{challenge.titulo}</h3>
                        <p className="text-slate-600">{challenge.descripcion}</p>
                      </div>
                      {completedChallenges.includes(challenge.id) && (
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-200">Completado</span>
                      )}
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
                      <p className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Criterios de Éxito</p>
                      <div className="space-y-3">
                        {challenge.checklist.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${completedChallenges.includes(challenge.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                              <i className="fa-solid fa-check text-[10px]"></i>
                            </div>
                            <span className={`text-sm ${completedChallenges.includes(challenge.id) ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleChallenge(challenge.id)}
                      className={`w-full py-3 rounded-xl font-bold transition-all ${
                        completedChallenges.includes(challenge.id) 
                        ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100'
                      }`}
                    >
                      {completedChallenges.includes(challenge.id) ? 'Reiniciar Reto' : 'Marcar como Finalizado (+15 pts)'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: HELP */}
        {activeTab === 'help' && (
          <div className="animate-fadeIn max-w-3xl mx-auto">
             <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
               <h2 className="text-3xl font-black text-slate-900 mb-6">Acerca de esta APP</h2>
               <div className="space-y-6 text-slate-600 leading-relaxed">
                 <section>
                   <h4 className="font-bold text-slate-900 mb-2">Objetivo Educativo</h4>
                   <p>Esta aplicación fue desarrollada específicamente para los alumnos de 4º semestre del CBTis 187, permitiendo un estudio autodirigido de PHP de servidor.</p>
                 </section>
                 <section>
                   <h4 className="font-bold text-slate-900 mb-2">Fuentes de Información</h4>
                   <p>Todo el contenido teórico, ejemplos de código y retos prácticos han sido extraídos rigurosamente de:</p>
                   <ul className="list-disc pl-5 mt-2 space-y-1">
                     <li>Video Educativo: <strong>"PHP en 30 Minutos"</strong> por Programador X.</li>
                     <li>Documento PDF: <strong>"Aprende PHP Guía Práctica"</strong> por Academia X.</li>
                   </ul>
                 </section>
                 <section>
                   <h4 className="font-bold text-slate-900 mb-2">Instalación Local de PHP</h4>
                   <p>Recuerda que para ejecutar los códigos que escribas en tus retos necesitas tener instalado <strong>XAMPP</strong>. Abre el panel de control de XAMPP y asegúrate de iniciar el módulo <strong>Apache</strong>.</p>
                 </section>
               </div>
             </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.9); opacity: 0; }
          70% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-bounceIn { animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default App;
