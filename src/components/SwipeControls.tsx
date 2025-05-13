interface SwipeControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onLike: () => void;
  onIgnore: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const SwipeControls: React.FC<SwipeControlsProps> = ({
  onPrev,
  onNext,
  onLike,
  onIgnore,
  hasPrev,
  hasNext
}) => {
  return (
    <div className="mt-4 flex flex-col items-center space-y-2">
      <div className="flex gap-4">
        <button className="btn" onClick={onPrev} disabled={!hasPrev}>
          ← Prev
        </button>
        <button className="btn" onClick={onNext} disabled={!hasNext}>
          Next →
        </button>
      </div>
      <div className="flex gap-4">
        <button className="btn btn-error" onClick={onIgnore}>
          Ignore
        </button>
        <button className="btn btn-success" onClick={onLike}>
          Like
        </button>
      </div>
    </div>
  );
};

export default SwipeControls;
