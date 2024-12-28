import React, { useState } from 'react';
import { DocumentInput } from './components/DocumentInput';
import { SimplifiedContent } from './components/SimplifiedContent';
import { QuestionInput } from './components/QuestionInput';
import { Answer } from './components/Answer';
import { SimplifiedDocument, Question } from './types';
import { BookOpen } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<SimplifiedDocument | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleDocumentSubmit = async (text: string) => {
    setIsLoading(true);
    // TODO: Implement API call to process document
    // For now, using mock data
    setTimeout(() => {
      setDocument({
        original: text,
        simplified: "簡略化されたテキストがここに表示されます。",
        suggestedQuestions: [
          "この文書の主な目的は何ですか？",
          "重要なポイントを3つ挙げてください。",
          "この内容は実際にどのように適用できますか？"
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleQuestionSubmit = async (text: string) => {
    setIsLoading(true);
    // TODO: Implement API call to get answer
    // For now, using mock data
    setTimeout(() => {
      setQuestions([
        ...questions,
        {
          text,
          answer: "質問への回答がここに表示されます。"
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            専門文書簡略化アシスタント
          </h1>
          <p className="text-gray-600">
            専門的な文書を分かりやすく説明し、質問に答えます
          </p>
        </div>

        {!document && (
          <DocumentInput
            onSubmit={handleDocumentSubmit}
            isLoading={isLoading}
          />
        )}

        {document && (
          <>
            <SimplifiedContent
              document={document}
              onQuestionSelect={handleQuestionSubmit}
            />
            <QuestionInput
              onSubmit={handleQuestionSubmit}
              isLoading={isLoading}
            />
            <Answer questions={questions} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;