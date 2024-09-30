import React from "react";

export default function Development() {
  return (
    <div
      className="container"
      style={{ maxHeight: "500px", overflowY: "auto" }}>
      <div>
        <div className="mb-5">
          <h1 className="mb-4">Development Plan</h1>
          <h5>
            A collection of ideas and designs for the development of
            cookingpot.live
          </h5>
          <h5>
            This is by no means an exhaustive list and you're welcome to use the
            "Contact Us" link to share your ideas!
          </h5>
        </div>

        <ul>
          <li>Calendar</li>
          <ol>
            <li>
              Users will be able to save other elements of cookingpot.live to
              their Calendar (e.g. important growing dates, educational events
              or activities).
            </li>
            <li>
              Users will be able to see important dates (e.g. sowing or
              harvesting periods) for produce they have recorded in their
              profile.
            </li>
          </ol>
        </ul>

        <hr className="w-50" />

        <ul>
          <li>Education & Activities</li>
          <ol>
            <li>
              Advertise activities and events, which will be compatible with the
              Calendar page, allowing users to set reminders.
            </li>
          </ol>
        </ul>

        <hr className="w-50" />

        <ul>
          <li>Encyclopedia</li>
          <ol>
            <li>
              Users will be able to access a database of information on a wide
              range of common fruits, vegetables, herbs and other plants to
              support their growing efforts.
            </li>
            <li>
              Users will be able to link the plants they research to their own
              profile and store important dates in their Calendar.
            </li>
          </ol>
        </ul>

        <hr className="w-50" />

        <ul>
          <li>Shop</li>
          <ol>
            <li>
              Users will be able to buy fresh food products directly from
              cookingpot.live via a shopfront interface that connects "local"
              producers directly with the local community.
            </li>
            <li>
              Local food producers, who do not use any harmful elements or
              practices in the production of their food, will be able to create
              an account and sell directly to the local community.
            </li>
          </ol>
        </ul>

        <hr className="w-50" />

        <ul>
          <li>Food-at-a-Glance</li>
          <ol>
            <li>
              Users will be able to flag that they have food available which is
              going to go to waste, allowing for collections from other users or
              community organisations.
            </li>
            <li>
              Food banks, and other organisations that support the local
              community, will be able to see where food is going to waste in the
              local community via the Google Maps API and will be able to reach
              out to arrange to collect it.
            </li>
          </ol>
        </ul>

        <hr className="w-50" />
      </div>
    </div>
  );
}
