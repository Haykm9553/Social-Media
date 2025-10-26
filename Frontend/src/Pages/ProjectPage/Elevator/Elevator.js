import React, { useEffect } from 'react';
import './Elevator.css';

const Elevator = () => {
  useEffect(() => {
    const userFloors = document.querySelectorAll(".UserFloor");
    const elevators = document.querySelectorAll(".Elevator > div");
    const floorHeight = 50  ;

    function getClosestElevator(targetFloor) {
      let closestElevator = null;
      let minDistance = Infinity;

      elevators.forEach(elevator => {
        const currentFloor = parseInt(elevator.getAttribute("current-floor"));
        const distance = Math.abs(currentFloor - targetFloor);

        if (distance < minDistance) {
          minDistance = distance;
          closestElevator = elevator;
        }
      });

      return closestElevator;
    }

    userFloors.forEach(floor => {
      floor.addEventListener("click", () => {
        const targetFloor = parseInt(floor.dataset.floor);
        const closestElevator = getClosestElevator(targetFloor);

        if (closestElevator) {
          const currentFloor = parseInt(closestElevator.getAttribute("current-floor"));
          const distance = targetFloor - currentFloor;

          closestElevator.setAttribute("current-floor", targetFloor);
          closestElevator.style.transform = `translateY(${-(targetFloor - 1) * floorHeight}px)`;
        }
      });
    });

    return () => {
      userFloors.forEach(floor => {
        floor.replaceWith(floor.cloneNode(true)); // удаляет слушатели
      });
    };
  }, []);

  return (
    <main className='ElevatorMain'>
      <div className="Elevator">
        <div className="FirstElevator" current-floor="1" style={{ transform: "translateY(0)" }}>
          <div className="First">1</div>
        </div>
        <div className="SecondElevator" current-floor="1" style={{ transform: "translateY(0)" }}>
          <div className="First">2</div>
        </div>
        <div className="ThirdElevator" current-floor="1" style={{ transform: "translateY(0)" }}>
          <div className="First">3</div>
        </div>
      </div>
      <div className="Floor">
        {Array.from({ length: 18 }, (_, i) => 18 - i).map(floor => (
          <div key={floor} className="UserFloor" data-floor={floor}>
            {floor}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Elevator;
