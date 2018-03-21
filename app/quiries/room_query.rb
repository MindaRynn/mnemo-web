class RoomsQuery
  attr_reader :rooms, :filters, :sorts

  INCLUDED_ASSOC = [:place].freeze

  def initialize(rooms = nil, filters = {}, sorts = {})
    @rooms = rooms || Room.all
    @filters = filters
    @sorts = sorts
  end

  def call
    @rooms = @rooms.order(order_by)

    return travelogue_filtered_businesses if filter_by_travelogue.present?
  end

  private

  def travelogue_filtered_businesses
    # TODO: remove static assignment to `Travelogue`
    conditions = { checkins: { checkinable_id: filter_by_travelogue, checkinable_type: 'Travelogue' } }

    @businesses = @businesses.where(conditions).joins(:checkins)
  end

  def filter_by_travelogue
    filters[:travelogue_id]
  end

  def order_by
    return { name: sort_direction } unless sorts[:sort_by].present?
    { sorts[:order_by] => sort_direction }
  end

  def sort_direction
    return :asc unless sorts[:direction].present?
    sorts[:direction]
  end
end
