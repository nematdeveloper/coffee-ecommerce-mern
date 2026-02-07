import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const QuestionCard = ({ searchQuery = "" }) => {
  const { t } = useTranslation('faq');
  const [openQuestionId, setOpenQuestionId] = useState(null);

  // Questions and Answers with translation keys
  const QuestionsAndAnswers = [
    {
      id: 1,
      questionKey: "questions.q1.question",
      answerKey: "questions.q1.answer"
    },
    {
      id: 2,
      questionKey: "questions.q2.question",
      answerKey: "questions.q2.answer"
    },
    {
      id: 3,
      questionKey: "questions.q3.question",
      answerKey: "questions.q3.answer"
    },
    {
      id: 4,
      questionKey: "questions.q4.question",
      answerKey: "questions.q4.answer"
    },
    {
      id: 5,
      questionKey: "questions.q5.question",
      answerKey: "questions.q5.answer"
    },
    {
      id: 6,
      questionKey: "questions.q6.question",
      answerKey: "questions.q6.answer"
    },
    {
      id: 7,
      questionKey: "questions.q7.question",
      answerKey: "questions.q7.answer"
    },
    {
      id: 8,
      questionKey: "questions.q8.question",
      answerKey: "questions.q8.answer"
    },
    {
      id: 9,
      questionKey: "questions.q9.question",
      answerKey: "questions.q9.answer"
    },
    {
      id: 10,
      questionKey: "questions.q10.question",
      answerKey: "questions.q10.answer"
    },
    {
      id: 11,
      questionKey: "questions.q11.question",
      answerKey: "questions.q11.answer"
    },
    {
      id: 12,
      questionKey: "questions.q12.question",
      answerKey: "questions.q12.answer"
    },
  ];

  // Get translated questions and answers
  const getTranslatedQuestions = () => {
    return QuestionsAndAnswers.map(q => ({
      id: q.id,
      Question: t(q.questionKey),
      Answer: t(q.answerKey)
    }));
  };

  const translatedQuestions = getTranslatedQuestions();

  // Filter questions based on search query
  const filteredQuestions = translatedQuestions.filter(q => {
    if (!searchQuery.trim()) return true; // Show all if no search
    
    const query = searchQuery.toLowerCase();
    return (
      q.Question.toLowerCase().includes(query) ||
      q.Answer.toLowerCase().includes(query)
    );
  });

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  // If search returns no results
  if (filteredQuestions.length === 0) {
    return (
      <div className="flex flex-col mt-20 gap-4 max-w-3xl mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {t("search.noResultsTitle")}
          </h3>
          <p className="text-gray-500">
            {t("search.noResultsFor")} "<span className="font-medium">{searchQuery}</span>"
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {t("search.tryDifferentKeywords")}
          </p>
        </div>
        
        {/* Show all questions as fallback with a message */}
        <div className="mt-8">
          <p className="text-gray-600 mb-4 font-medium">{t("search.showAllQuestions")}:</p>
          {translatedQuestions.map((q) => (
            <div
              key={q.id}
              className="flex flex-col gap-3 rounded-xl cursor-pointer p-4 hover:bg-gray-50 transition-colors mb-3"
              onClick={() => toggleQuestion(q.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{q.Question}</span>
                <span className="text-primary text-lg">
                  {openQuestionId === q.id ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              
              {openQuestionId === q.id && (
                <span className="text-gray-600 mt-2 pt-3 border-t border-gray-100">
                  {q.Answer}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-20 gap-4 max-w-3xl mx-auto p-4">
      {/* Search results count */}
      {searchQuery && (
        <div className="mb-2">
          <p className="text-gray-600">
            {t("search.found")} <span className="font-semibold">{filteredQuestions.length}</span> 
            {filteredQuestions.length === 1 ? t("search.resultSingular") : t("search.resultPlural")} {t("search.for")} "
            <span className="font-medium">{searchQuery}</span>"
          </p>
        </div>
      )}

      {/* Filtered questions */}
      {filteredQuestions.map((q) => (
        <div
          key={q.id}
          className="flex flex-col gap-3 rounded-xl cursor-pointer p-4 hover:bg-gray-50 transition-colors mb-3"
          onClick={() => toggleQuestion(q.id)}
          aria-expanded={openQuestionId === q.id}
          aria-label={`${q.Question} - ${openQuestionId === q.id ? t("search.expanded") : t("search.collapsed")}`}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">{q.Question}</span>
            <span className="text-primary text-lg">
              {openQuestionId === q.id ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          
          {openQuestionId === q.id && (
            <span className="text-gray-600 mt-2 pt-3 border-t border-gray-100">
              {q.Answer}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;