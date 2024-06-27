import React from "react";
import { TodoCardXL, TodoCardSM } from "../components/index.js"

function Home() {
    return (
        <section className="w-full shadow-lg m-6 bg-primaryColor">
            <section className="w-full h-full mx-auto flex flex-col justify-start items-start p-3 gap-3">
                <TodoCardXL
                    title="This is a demo title"
                    content="This is a dummy text about content lasdfjlaks dflaksd fl;kasd jflasdf"
                    tags={[
                        {
                            color: "red",
                            name: "work",
                        },
                        {
                            color: "blue",
                            name: "study"
                        }, {
                            color: "green",
                            name: "important"
                        }
                    ]}
                />
                <div className="w-full flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center gap-2 flex-grow px-4 py-2">
                        <div className="w-4 h-4 bg-deleteButtonColorSec rounded-full"></div>
                        <h2 className="text-center text-xl">
                            To-Do <span>{12}</span>
                        </h2>
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-grow px-4 py-2">
                        <div className="w-4 h-4 bg-editButtonColorSec rounded-full"></div>
                        <h2 className="text-center text-xl">
                            On-Going <span>{12}</span>
                        </h2>
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-grow px-4 py-2">
                        <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
                        <h2 className="text-center text-xl">
                            Completed <span>{18}</span>
                        </h2>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-start gap-3 h-full">
                    <div className="flex items-start justify-between w-full gap-3 h-full">
                        <div className="todos border-2 border-deleteButtonColorSec flex-grow flex flex-col items-start justify-start px-4 py-2 overflow-y-scroll h-[640px]">
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                        </div>
                        <div className="inprogress border-2 border-editButtonColorSec flex-grow flex flex-col items-start justify-start px-4 py-2 overflow-y-scroll h-[640px]">
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                        </div>
                        <div className="completed border-2 border-yellow-400 flex-grow flex flex-col items-start justify-start px-4 py-2 overflow-y-scroll h-[640px]">
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                            <TodoCardSM completeBy={"12-02-2024"} title={"Study"} trimmed_content={["physics", "history"]} />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
export default Home;
