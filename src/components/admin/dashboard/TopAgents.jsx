import React from "react";

export default function TopAgents() {
  const agents = [
    {
      name: "Sarah J.",
      role: "Tier 3 Lead",
      count: "142",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQWtvVRzAIYVEUftl3nZ6wh-vcb10PTl-9Sd02AKPlg1eXMAOdFHp8OlArxWdLXRDq0eSbxMnnOgLqS5jMYrmtbfdtewutjT7I3RbKdOQn3XGxd4R1ei6yRY7D8-disdhjePMnCMDphatUPvGDczeMg4c4jcsGT1ySHz63IjEWxhbcE6bvLHfVxiJyo8CE4R38xxNLl7lwRSI0oieF6kN0Iv4kcv27yKxMeaJ--0SEgyQu6O_SmIWitP0mOgu02hw-P4vNreHamjY",
    },
    {
      name: "David C.",
      role: "Network Specialist",
      count: "128",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmpjPoYtD2VECTH3NL6dxHTD4CP_QvHH8MNTaaOBjmXh4kML_G1oqeZmqA1Af5vDmyQyEgYfGjxa5GATsSBhGeQui9bgDh3ne6bO2azoVQc-ikls4zRTJzEGwYujo30E2xiU6xgtT1LTMSs3HWnLrTOc_019nFc2mnKqKbn0oEAAfHNPPya9DxerPmUcKN7KLz8R53aFXzdemj-RUg03RWvqFv_pARx24uWJlKYixxxx80XLCWy6LZaAvD5hEk5vQLvg2TZvlqZRw",
    },
    {
      name: "Alex M.",
      role: "Help Desk Admin",
      count: "98",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWi5LxesOxRKFdJZCbZdgsiggt8CWqWHo26UIhQY65TMvZeJocrKP4DdUeqBML69iIapyqAbsz0JKpWPRPP6mFAWNNpkEl5vF9l8tbAMQ5y-HA4MUKbnHOmMt8akDCA15ntZybSTQMBbxn_dh89oYRSCQwUOudIcbAjlE8OC0e_63sT6yecbhrbz3WC9UwJw0dso9HYfvHg4VzaXIPygti4bU4Wf_fg-v0xwtk9fA7FR-3bJJBk3l3LBLWmTw3cQfNx_K1kElKYCQ",
    },
    {
      name: "Maria G.",
      role: "Cloud Engineer",
      count: "84",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ONQKAbXRsx9QSURMaFfhlJWzxxJQjRGB5fFYh0Q_YBnYGZ6hgq3Pg1xWAYg3PycT3IVVFvzbyJE_pwsPKQQ1agdnEVasWrWecXfF_7uKebFMZ5O-hO9BZuUlsqsIQXMwKUB4apxyJrTUgtP8NHHkmyeXGjMKSn3s5cO0jhDwAz5L88IyM7s9sz6NjuTx1wq5Z17MI1OCRmx5EKIudoEC4cub2JqqPnyHWCvF7yfWPYZjvrGQ-Int9izAgsrBBjgvoyAsQGvqdus",
    },
  ];

  return (
    <div className="bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
      <div className="mb-xl">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Top Performing Agents
        </h2>
        <p className="font-body-md text-body-md text-outline">
          Highest resolution rates this period
        </p>
      </div>

      <div className="flex flex-col gap-lg">
        {agents.map((agent, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-md bg-surface-container-low rounded-xl transition-all hover:bg-surface-container-high border border-transparent hover:border-outline-variant"
          >
            <div className="flex items-center gap-md">
              <img
                alt={agent.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container-highest"
                src={agent.img}
              />
              <div>
                <p className="font-button-text text-on-surface">{agent.name}</p>
                <p className="text-label-md text-outline">{agent.role}</p>
              </div>
            </div>
            <span className="px-md py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md">
              {agent.count} Resolved
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-xl py-sm border-2 border-dashed border-outline-variant rounded-xl text-label-md font-label-md text-outline hover:text-primary hover:border-primary transition-all">
        View All Agents
      </button>
    </div>
  );
}
