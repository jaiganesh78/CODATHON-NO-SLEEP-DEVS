export default function ComplaintStatus({ status }) {
  const steps = [
    "Waiting for Approval",
    "Assigned to Department",
    "In Progress",
    "Completed",
  ];

  const statusIndex = {
    pending: 0,
    assigned: 1,
    progress: 2,
    completed: 3,
  };

  const activeIndex = statusIndex[status];

  return (
    <div className="bg-white rounded-2xl p-6 shadow border mb-8">
      <h3 className="text-lg font-semibold mb-4">Complaint Status</h3>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const active = index <= activeIndex;

          return (
            <div key={step} className="flex-1 flex flex-col items-center">
              {/* Circle */}
              <div
                className={`h-4 w-4 rounded-full ${
                  active ? "bg-green-500" : "bg-gray-300"
                }`}
              />

              {/* Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`h-1 w-full ${
                    active ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}

              {/* Label */}
              <p className="mt-2 text-xs text-center text-gray-600">
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
