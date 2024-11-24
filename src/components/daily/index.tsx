import React, { useState } from 'react';
import './index.css';
interface Plan {
  id: number;
  text: string;
  completed: boolean;
}

const DailyPlan: React.FC = () => {
  const list = [
    { id: 1, text: '学习React', completed: false },
    { id: 2, text: '学习Vue', completed: true },
    { id: 3, text: '学习Angular', completed: false },
    { id: 4, text: '学习JavaScript', completed: true },
    { id: 5, text: '学习TypeScript', completed: false },
  ]
  const [plans, setPlans] = useState<Plan[]>(list);
  const [newPlanText, setNewPlanText] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);

  const addPlan = () => {
    if (newPlanText.trim() !== '') {
      const newPlan: Plan = {
        id: Date.now(),
        text: newPlanText,
        completed: false,
      };
      setPlans([...plans, newPlan]);
      setNewPlanText('');
    }
  };

  const deletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const toggleCompletion = (id: number) => {
    setPlans(plans.map(plan => {
      if (plan.id === id) {
        return {
          ...plan,
          completed: !plan.completed,
        };
      }
      return plan;
    }));
  };

  const toggleSelectPlan = (id: number) => {
    setSelectedPlans(prevSelectedPlans =>
      prevSelectedPlans.includes(id)
        ? prevSelectedPlans.filter(planId => planId !== id)
        : [...prevSelectedPlans, id]
    );
  };

  const deleteSelectedPlans = () => {
    setPlans(plans.filter(plan => !selectedPlans.includes(plan.id)));
    setSelectedPlans([]);
  };

  const updatePlanText = (id: number, newText: string) => {
    setPlans(plans.map(plan => {
      if (plan.id === id) {
        return {
          ...plan,
          text: newText,
        };
      }
      return plan;
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={newPlanText}
        onChange={e => setNewPlanText(e.target.value)}
      />
      <button onClick={addPlan}>新增</button>
      <button onClick={deleteSelectedPlans} disabled={selectedPlans.length === 0}>
        批量删除
      </button>
      <ul className='daily_ul'>
        {plans.map(plan => (
          <li key={plan.id} className='daily_li'>
            <input
              type="checkbox"
              className='daily_checkbox'
              checked={selectedPlans.includes(plan.id)}
              onChange={() => toggleSelectPlan(plan.id)}
            />
            <input
              type="text"
              value={plan.text}
              onChange={e => updatePlanText(plan.id, e.target.value)}
              style={{ textDecoration: plan.completed ? 'line-through' : 'none' }}
            />
            <button onClick={() => deletePlan(plan.id)}>删除</button>
            <button onClick={() => toggleCompletion(plan.id)}>{plan.completed ? '未完成' : '已完成'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyPlan;