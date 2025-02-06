import React, { useRef, useState, useEffect } from 'react';

const RouteDefine = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [context, setContext] = useState(null);

  // Konfiguration
  const stepSize = 20;
  const stepTime = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    setContext(ctx);
  }, []);

  const getDirection = (dx, dy) => {
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left';
    }
    return dy > 0 ? 'down' : 'up';
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas leeren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    
    setIsDrawing(true);
    setCurrentPosition({ x: startX, y: startY });
    setSteps([]);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentPosition) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - currentPosition.x;
    const dy = mouseY - currentPosition.y;

    if (dx === 0 && dy === 0) return;

    const direction = getDirection(dx, dy);
    const axis = ['left', 'right'].includes(direction) ? 'x' : 'y';
    const distance = axis === 'x' ? Math.abs(dx) : Math.abs(dy);
    const numSteps = Math.floor(distance / stepSize);

    if (numSteps > 0) {
      let newX = currentPosition.x;
      let newY = currentPosition.y;

      switch (direction) {
        case 'right':
          newX += numSteps * stepSize;
          break;
        case 'left':
          newX -= numSteps * stepSize;
          break;
        case 'down':
          newY += numSteps * stepSize;
          break;
        case 'up':
          newY -= numSteps * stepSize;
          break;
      }

      context.lineTo(newX, newY);
      context.stroke();

      const newSteps = Array(numSteps).fill({ direction, duration: stepTime });
      setSteps(prev => [...prev, ...newSteps]);
      setCurrentPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    context.closePath();
  };

  return (
    <div id="routedefine">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ 
          border: '1px solid black',
          backgroundColor: '#f0f0f0'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      <div className="route-info">
        <h3>Definierte Route:</h3>
        <div className="steps-list">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <span>Schritt {index + 1}:</span>
              <span>{step.direction}</span>
              <span>({step.duration}s)</span>
            </div>
          ))}
        </div>
        <div className="total-time">
          Gesamtzeit: {(steps.length * stepTime).toFixed(1)}s
        </div>
      </div>
    </div>
  );
};

export default RouteDefine;