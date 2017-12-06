const eventSourced = require('./event-sourced')

// public class Order : EventSourced
// {
//     private List<SeatQuantity> seats;
//
//     protected Order(Guid id) : base(id)
//     {
//         base.Handles<OrderUpdated>(this.OnOrderUpdated);
//         ...
//     }
//
//     public Order(Guid id, IEnumerable<IVersionedEvent> history) : this(id)
//     {
//         this.LoadFrom(history);
//     }
//
//     public void UpdateSeats(IEnumerable<OrderItem> seats)
//     {
//         this.Update(new OrderUpdated { Seats = ConvertItems(seats) });
//     }
//
//     private void OnOrderUpdated(OrderUpdated e)
//     {
//         this.seats = e.Seats.ToList();
//     }
//
//     ...
// }

const orderMixin = (id, history) => {
  const seats = []

  const order = Object.assign(
    {},
    eventSourced(id),
    {
      updateSeats: () => {
        update(orderUpdated...)
      }
    }
  )

  order.loadFrom(history)

  return order
}

module.exports.order = orderMixin

// public interface IEventSourced
// {
//     Guid Id { get; }
//
//     int Version { get; }
//
//     IEnumerable<IVersionedEvent> Events { get; }
// }
// ...
// public abstract class EventSourced : IEventSourced
// {
//     private readonly Dictionary<Type, Action<IVersionedEvent>> handlers = new Dictionary<Type, Action<IVersionedEvent>>();
//     private readonly List<IVersionedEvent> pendingEvents = new List<IVersionedEvent>();
//
//     private readonly Guid id;
//     private int version = -1;
//
//     protected EventSourced(Guid id)
//     {
//         this.id = id;
//     }
//
//     public Guid Id
//     {
//         get { return this.id; }
//     }
//
//     public int Version { get { return this.version; } }
//
//     public IEnumerable<IVersionedEvent> Events
//     {
//         get { return this.pendingEvents; }
//     }
//
//     protected void Handles<TEvent>(Action<TEvent> handler)
//         where TEvent : IEvent
//     {
//         this.handlers.Add(typeof(TEvent), @event => handler((TEvent)@event));
//     }
//
//     protected void LoadFrom(IEnumerable<IVersionedEvent> pastEvents)
//     {
//         foreach (var e in pastEvents)
//         {
//             this.handlers[e.GetType()].Invoke(e);
//             this.version = e.Version;
//         }
//     }
//
//     protected void Update(VersionedEvent e)
//     {
//         e.SourceId = this.Id;
//         e.Version = this.version + 1;
//         this.handlers[e.GetType()].Invoke(e);
//         this.version = e.Version;
//         this.pendingEvents.Add(e);
//     }
// }
//
// ...
//
//
// ...
//
// public struct SeatQuantity
// {
//     ...
// }
