/**
 * The location model that includes network information.
 */
export interface Location {
  /**
   * The name to associate with this location.
   */
  name?: string;

  /**
   * The Local (Internal) IP Address. If your computer is connected to a
   * router with default settings, that router will automatically assign a
   * local IP address to your computer. Your local IP address is hidden
   * from the outside world and used only inside your private network.
   * 
   * https://goo.gl/txEmRd
   */
  local_ip_address?: LocalIpAddress;

  /**
   * The External (Public) IP Address. The Internet Service Provider (ISP)
   * assigns you an external IP address when you connect to the Internet.
   * When your browser requests a webpage, it sends this IP address
   * along with it.
   *
   * https://goo.gl/txEmRd
   */
  external_ip_address?: string;

  /**
   * Extra information to add to the location.
   */
  metadata?: {
    project?: string;
    timestamp?: string;
  };
}

export interface LocalIpAddress {
  [key:string]: {
    local_ip_address?: string;
    mac_address?: string;
  }
}