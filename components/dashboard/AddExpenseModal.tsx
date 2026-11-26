'use client';

import React, { useState } from 'react';
import { X, Check, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useFinance, todayISO, type TxType } from '@/context/FinanceContext';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: TxType;
}

export default function AddExpenseModal({ isOpen, onClose, initialType = 'expense' }: AddExpenseModalProps) {
  const { categories, addTransaction } = useFinance();

  const [type, setType] = useState<TxType>(initialType);
  const [amountStr, setAmountStr] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => todayISO());
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const isIncome = type === 'income';

  // Fall back to the first category if none is chosen yet or the chosen one was deleted
  const activeCategory = categories.some((c) => c.name === category)
    ? category
    : categories[0]?.name ?? '';

  const resetForm = () => {
    setAmountStr('');
    setName('');
    setNote('');
    setError('');
    setType(initialType);
    setDate(todayISO());
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseInt(amountStr.replace(/[^0-9]/g, ''), 10);

    if (!isIncome && !activeCategory) {
      setError('Add a budget category first in Monthly Budget.');
      return;
    }

    const result = addTransaction({
      type,
      name,
      amount: cleanAmount,
      category: isIncome ? 'Income' : activeCategory,
      date,
      note,
    });

    if (!result.ok) {
      setError(result.error || 'Could not save this transaction.');
      return;
    }

    setError('');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      resetForm();
      onClose();
    }, 700);
  };

  const typeBtn = (value: TxType, label: string, Icon: typeof ArrowUpRight) => {
    const active = type === value;
    return (
      <button
        type='button'
        onClick={() => setType(value)}
        aria-pressed={active}
        className={'flex-1 min-h-11 inline-flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ' + (active ? 'bg-[#224431] text-white shadow-sm' : 'text-[#4F6253] hover:bg-black/5')}
      >
        <Icon className='w-3.5 h-3.5' />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] bg-black/40 backdrop-blur-xs animate-in fade-in duration-150'>
      <div role='dialog' aria-modal='true' aria-label='Add a transaction' className='relative w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DCE4DD] animate-in zoom-in-95 duration-150'>
        <div className='flex items-center justify-between pb-3 border-b border-[#F0F4F0]'>
          <div>
            <h3 className='text-base font-bold text-[#1E3A2B]'>Add a transaction</h3>
            <p className='text-xs text-[#718576]'>A few seconds now. More clarity later.</p>
          </div>
          <button
            type='button'
            onClick={handleClose}
            className='min-w-11 min-h-11 -mr-2 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700 hover:bg-black/5'
            aria-label='Close'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {savedSuccess ? (
          <div className='py-12 flex flex-col items-center justify-center text-center'>
            <div className='w-12 h-12 rounded-full bg-[#E7F6EC] text-[#20743E] flex items-center justify-center mb-3'>
              <Check className='w-6 h-6 stroke-[3]' />
            </div>
            <p className='text-sm font-bold text-[#1E3A2B]'>{isIncome ? 'Income recorded!' : 'Expense recorded!'}</p>
            <p className='text-xs text-[#6B8071] mt-1'>Your balance and daily limit have been updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
            <div className='flex gap-1 p-1 rounded-2xl bg-[#FAF8F5] border border-[#E4ECE4]'>
              {typeBtn('expense', 'You paid', ArrowUpRight)}
              {typeBtn('income', 'You received', ArrowDownLeft)}
            </div>

            <div>
              <label className='text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1'>Amount *</label>
              <div className='relative'>
                <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1E3A2B]'>Rp</span>
                <input
                  type='text'
                  inputMode='numeric'
                  required
                  autoFocus
                  placeholder='0'
                  value={amountStr}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setAmountStr(raw ? parseInt(raw, 10).toLocaleString('id-ID') : '');
                  }}
                  className='w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#D5E1D7] text-lg font-extrabold text-[#1E3A2B] focus:outline-none focus:border-[#224431] focus:ring-1 focus:ring-[#224431] bg-[#FAF8F5]'
                />
              </div>
            </div>

            <div>
              <label className='text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1'>
                {isIncome ? 'Where did it come from? *' : 'What was it for? *'}
              </label>
              <input
                type='text'
                required
                placeholder={isIncome ? 'e.g. Freelance project' : 'e.g. Lunch at campus'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-3.5 py-2.5 rounded-xl border border-[#D5E1D7] text-base sm:text-xs font-semibold text-[#1E3A2B] focus:outline-none focus:border-[#224431] bg-white'
              />
            </div>

            {!isIncome && (
              <div>
                <label className='text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1'>Category *</label>
                <select
                  value={activeCategory}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full px-3.5 py-2.5 rounded-xl border border-[#D5E1D7] text-base sm:text-xs font-semibold text-[#1E3A2B] focus:outline-none focus:border-[#224431] bg-white cursor-pointer'
                >
                  {categories.length === 0 && <option value=''>No categories yet</option>}
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className='text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1'>Date</label>
              <input
                type='date'
                value={date}
                max={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                className='w-full px-3.5 py-2 rounded-xl border border-[#D5E1D7] text-base sm:text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white'
              />
            </div>

            <div>
              <label className='text-[11px] font-bold text-[#677C6D] uppercase tracking-wider block mb-1'>Note (optional)</label>
              <textarea
                rows={2}
                placeholder='Add a little detail'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className='w-full px-3.5 py-2 rounded-xl border border-[#D5E1D7] text-base sm:text-xs font-medium text-[#1E3A2B] focus:outline-none bg-white resize-none'
              />
            </div>

            {error && (
              <p className='text-xs font-semibold text-[#B4491F] bg-[#FBE9E2] rounded-lg px-3 py-2'>{error}</p>
            )}

            <div className='pt-2 flex items-center justify-between gap-3'>
              <button
                type='button'
                onClick={handleClose}
                className='w-1/2 min-h-11 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#4F6253] bg-[#FAF8F5] hover:bg-black/5 transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='w-1/2 min-h-11 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#224431] hover:bg-[#163323] transition-colors shadow-sm cursor-pointer'
              >
                {isIncome ? 'Save income' : 'Save expense'}
              </button>
            </div>

            <p className='text-[11px] text-center text-[#7E8F82]'>
              {isIncome ? 'Required: amount and source.' : 'Required: amount, description, and category.'}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
