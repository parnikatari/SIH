import { useEffect, useState } from "react";

export default function ViewClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Simulate fetch call
    const fetchClasses = async () => {
      const data = await Promise.resolve([
        { name: "Math 101" },
        { name: "Physics 202" },
      ]);
      setClasses(data);
    };

    fetchClasses();
  }, []);

  return (
    <>
      <div className="view-classes-container">
        <h2>My Classes</h2>
        {classes.length === 0 ? (
          <p className="no-class">No classes available.</p>
        ) : (
          <ul className="class-list">
            {classes.map((cls, index) => (
              <li key={index} className="class-item">{cls.name}</li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .view-classes-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
          text-align: center;
        }

        h2 {
          font-size: 1.8rem;
          color: #2575fc;
          margin-bottom: 20px;
        }

        .no-class {
          font-size: 1rem;
          color: #777;
        }

        .class-list {
          list-style: none;
          padding: 0;
        }

        .class-item {
          padding: 12px;
          margin-bottom: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          font-size: 1.1rem;
          transition: transform 0.2s ease, background 0.2s ease;
          cursor: pointer;
        }

        .class-item:hover {
          transform: scale(1.03);
          background: #eef4ff;
        }
      `}</style>
    </>
  );
}
