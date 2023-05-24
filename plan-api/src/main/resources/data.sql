INSERT INTO portfolio(name, portfolio_type) values ('Stocks/Bonds 80/20 Portfolio', 'AGGRESSIVE');
DELETE FROM portfolio where id = 1;
INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id)
VALUES ('Vanguard Total Bond Market', 'BND', 20, 2);

INSERT INTO portfolio(name, portfolio_type) values ('Golden Butterfly Portfolio', 'BALANCED');

INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id, type)
VALUES ('Vanguard Total Stock Market', 'VTI', 20, 3, 'STOCK');

INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id, type)
VALUES ('iShares 1-3 Year Treasury Bond', 'SHY', 20, 3, 'FIXED_INCOME');

INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id, type)
VALUES ('iShares 20+ Year Treasury Bond', 'TLT', 20, 3, 'FIXED_INCOME');

INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id, type)
VALUES ('SPDR Gold Trust', 'GLD', 20, 3, 'COMMODITY');

INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id, type)
VALUES ('iShares S&P Small-Cap 600 Value', 'IJS', 20, 3, 'STOCK');

INSERT INTO portfolio(name, portfolio_type) values ('Stocks/Bonds 20/80 Portfolio', 'CONSERVATIVE');

INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id, type)
VALUES ('Vanguard Total Bond Market', 'BND', 80, 4, 'FIXED_INCOME');

INSERT INTO portfolio_asset(name, ticker, portfolio_percent, portfolio_id, type)
VALUES ('Vanguard Total Stock Market', 'VTI', 20, 4, 'FIXED_INCOME');