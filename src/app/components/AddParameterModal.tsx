import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Activity, TrendingUp, TrendingDown, Palette } from 'lucide-react';
import { BloodParameter } from '../App';

interface AddParameterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddParameter: (parameter: BloodParameter) => void;
}

const PRESET_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Orange
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#6366F1', // Indigo
  '#F43F5E', // Rose
];

export function AddParameterModal({
  isOpen,
  onClose,
  onAddParameter,
}: AddParameterModalProps) {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setUnit('');
      setMinValue('');
      setMaxValue('');
      setSelectedColor(PRESET_COLORS[0]);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Bitte geben Sie einen Parameternamen ein');
      return;
    }

    if (!unit.trim()) {
      setError('Bitte geben Sie eine Maßeinheit ein');
      return;
    }

    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if (isNaN(min) || min < 0) {
      setError('Bitte geben Sie einen korrekten Minimalwert ein');
      return;
    }

    if (isNaN(max) || max <= min) {
      setError('Maximalwert muss größer als Minimalwert sein');
      return;
    }

    const newParameter: BloodParameter = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      unit: unit.trim(),
      normalRange: { min, max },
      color: selectedColor,
    };

    onAddParameter(newParameter);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-zinc-900 rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Neuer Parameter</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Название */}
              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">Namen des Parameters</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    placeholder="Beispiel: Vitamin D"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Единица измерения */}
              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">Maßeinheit</label>
                <div className="relative">
                  <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                      setError('');
                    }}
                    placeholder="Beispiel: ng/ml"
                    className="w-full pl-12 pr-4 py-4 bg-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Диапазон нормы */}
              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-2">Normbereich</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <TrendingDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="number"
                      step="0.1"
                      value={minValue}
                      onChange={(e) => {
                        setMinValue(e.target.value);
                        setError('');
                      }}
                      placeholder="Min"
                      className="w-full pl-12 pr-4 py-4 bg-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="number"
                      step="0.1"
                      value={maxValue}
                      onChange={(e) => {
                        setMaxValue(e.target.value);
                        setError('');
                      }}
                      placeholder="Max"
                      className="w-full pl-12 pr-4 py-4 bg-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Выбор цвета */}
              <div className="mb-6">
                <label className="block text-sm text-zinc-400 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Farbe für den Graphen
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-full aspect-square rounded-xl transition-all hover:scale-110 ${
                        selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Превью */}
              <div className="mb-6 p-4 bg-zinc-800 rounded-xl">
                <p className="text-sm text-zinc-400 mb-2">Vorschau</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-12 rounded-full"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div>
                    <p className="font-medium">{name || 'Namen des Parameters'}</p>
                    <p className="text-sm text-zinc-400">
                      {unit ? `${unit} • ` : ''}
                      {minValue && maxValue
                        ? `Norm: ${minValue} - ${maxValue}`
                        : 'Norm: nicht angegeben'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-95"
                  style={{
                    backgroundColor: selectedColor,
                    color: 'white',
                  }}
                >
                  Erstellen
                </button>
              </div>
            </form>

            {/* Safe area für iPhone */}
            <div className="h-8" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}