import { useState } from 'react';
import { Statistics } from '../Statistics/Statistics';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Section } from '../Section/Section';
import { Notification } from '../Notification/Notification';
import css from './App.module.css';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = option => {
    switch (option) {
      case 'good':
        setGood(good => good + 1);
        break;
      case 'bad':
        setBad(bad => bad + 1);
        break;
      case 'neutral':
        setNeutral(neutral => neutral + 1);
        break;

      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();

    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Please leave feedback</h1>
      <Section>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleButtonClick}
        />
      </Section>
      <Section title={'Statistics'}>
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification massage={'There is no feedback'} />
        )}
      </Section>
    </div>
  );
}
